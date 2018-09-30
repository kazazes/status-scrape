import got from "got";

import { StatusScrapeTargetNode } from "../../../prisma/dist";
import { ScraperStrategy } from "./strategy";

// tslint:disable:no-console
export class StatusPageStrategy extends ScraperStrategy {
  constructor(target: StatusScrapeTargetNode) {
    super(target);
    this.strategy = "STATUSPAGE_IO";
  }

  public async scrape() {
    console.log(`Starting scrape of ${this.target.statusUrl}`);
    const result = await got(this.target.statusUrl);
    return result;
  }
}
