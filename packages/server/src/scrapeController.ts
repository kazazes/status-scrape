import { logger } from "@status-scrape/common";
import { StatusScrapeTargetNode } from "@status-scrape/prisma";
import got from "got";
import { sign } from "jsonwebtoken";

export class ScrapeController {
  public target: StatusScrapeTargetNode;
  constructor(target: StatusScrapeTargetNode) {
    this.target = target;
  }

  public async scrape() {
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

    logger.info(JSON.stringify(response.body, null, 2));

    // TODO: Store scrape results
  }

  private getMachineToken() {
    return sign({ machine: true }, process.env.APP_SECRET, { expiresIn: "1h" });
  }
}
