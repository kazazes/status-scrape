import { logger } from "@status-scrape/common";
import {
  prisma,
  StatusScrapeResultCreateInput,
  StatusScrapeTargetNode,
  SystemStatus
} from "@status-scrape/prisma";
import got from "got";
import { sign } from "jsonwebtoken";
import { flatMap } from "lodash";

export class ScrapeController {
  public target: StatusScrapeTargetNode;
  constructor(target: StatusScrapeTargetNode) {
    this.target = target;
  }

  public async scrape() {
    const storedScrape = prisma.createStatusScrape({
      target: { connect: { id: this.target.id } }
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

    const response = await got(
      `${process.env.GC_FUNCTIONS_BASE_URL}statusScrape`,
      { headers, body: JSON.stringify(body) }
    );

    logger.silly(JSON.stringify(response.body, null, 2));

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

    await Promise.all(inputs);

    logger.debug(
      `Created ${inputs.length} status scrape results for ${
        this.target.name
      } (${this.target.statusUrl})`
    );
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
