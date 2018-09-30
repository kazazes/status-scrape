import { StatusScrapeTargetNode } from "../prisma";
import { ScraperStrategy } from "./strategy";

// tslint:disable:no-console
export class StatuspageStrategy extends ScraperStrategy {
  constructor(target: StatusScrapeTargetNode) {
    super(target);
    this.strategy = "STATUSPAGE_IO";
  }
}
