import { StatusScrapeTargetNode } from "../../../prisma/dist";
import { ScraperStrategy } from "./strategy";

// tslint:disable:no-console
export class StatusPageStrategy extends ScraperStrategy {
  public url: string;
  constructor(target: StatusScrapeTargetNode) {
    super(target);
    this.strategy = "STATUSPAGE_IO";
  }

  public async scrape() {
    console.log(`Starting scrape of ${this.target.statusUrl}`);
  }
}
