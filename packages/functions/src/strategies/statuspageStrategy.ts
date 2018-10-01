import {
  StatusScrapeResultCreateInput,
  StatusScrapeTargetNode
} from "../prisma";
import { ScraperStrategy } from "./strategy";

export class StatuspageStrategy extends ScraperStrategy {
  constructor(target: StatusScrapeTargetNode) {
    super(target);
    this.strategy = "STATUSPAGE_IO";
    this.interceptUrls.push("index.json");
  }

  public async parse() {
    const inputs: StatusScrapeResultCreateInput[] = [];
    return inputs;
  }
}
