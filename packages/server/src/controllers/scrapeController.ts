import { logger } from "@status-scrape/common";
import {
  prisma,
  StatusScrapeResultCreateInput,
  StatusScrapeResultNode,
  StatusScrapeTargetNode,
  SystemStatus
} from "@status-scrape/prisma";
import got, { Response } from "got";
import { sign } from "jsonwebtoken";
import { flatMap } from "lodash";

export class ScrapeController {
  public target: StatusScrapeTargetNode;
  public results: StatusScrapeResultNode[];
  constructor(target: StatusScrapeTargetNode) {
    this.target = target;
  }

  public async scrape() {
    const storedScrape = prisma.createStatusScrapeJob({
      target: { connect: { id: this.target.id } },
      status: "RUNNING"
    });
    const storedScrapeId = await storedScrape.id();

    logger.info(
      `Starting scrape of ${this.target.name} (${this.target.statusUrl})`
    );

    const token = this.getMachineToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    const body = { target: this.target };

    logger.verbose(`Headers: \n\n ${JSON.stringify(headers, null, 2)}`);
    logger.verbose(`Body: \n\n ${JSON.stringify(body, null, 2)}`);

    const timer = setTimeout(async () => {
      prisma.updateStatusScrapeJob({
        where: { id: storedScrapeId },
        data: {
          status: "TIMED_OUT"
        }
      });
      logger.error("Timed out.");
      throw new Error("Google Cloud Function timed out");
    }, 60000);
    let response: Response<string>;
    try {
      response = await got(`${process.env.GC_FUNCTIONS_BASE_URL}statusScrape`, {
        headers,
        body: JSON.stringify(body)
      });
    } catch (e) {
      logger.error(`Request to ${
        process.env.GC_FUNCTIONS_BASE_URL
      }statusScrape failed
      Body: ${JSON.stringify(body, null, 2)}`);
      return prisma.updateStatusScrapeJob({
        where: { id: storedScrapeId },
        data: { status: "FAILED" }
      });
    }

    clearTimeout(timer);

    logger.silly(JSON.stringify(response.body, null, 2));

    // Map returned results to database
    const parsedTarget = JSON.parse(response.body) as IScrapeFunctionResponse;
    const inputs = flatMap(parsedTarget.results, category => {
      return category.components.map(component => {
        const input: StatusScrapeResultCreateInput = {
          category: category.category,
          component: component.name,
          status: component.status,
          scrape: { connect: { id: storedScrapeId } }
        };
        return prisma.createStatusScrapeResult(input);
      });
    });

    this.results = await Promise.all(inputs);

    logger.debug(
      `Created ${inputs.length} status scrape results for ${
        this.target.name
        // tslint:disable-next-line:no-console
      } (${this.target.statusUrl})`
    );

    return prisma.updateStatusScrapeJob({
      where: { id: storedScrapeId },
      data: { status: "DONE" }
    });
  }

  private getMachineToken() {
    return sign({ machine: true }, process.env.APP_SECRET, { expiresIn: "1h" });
  }
}

interface IScrapeFunctionResponse {
  target: any;
  dom: string;
  results: IParsedCategory[];
}

export interface IParsedCategory {
  category: string;
  components: [{ name: string; status: SystemStatus }];
}
