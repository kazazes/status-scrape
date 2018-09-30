import got, { Response } from "got";
import { ScrapeStrategy, StatusScrapeTargetNode } from "../prisma";

export abstract class ScraperStrategy {
  public target: StatusScrapeTargetNode;
  public strategy: ScrapeStrategy;
  constructor(target: StatusScrapeTargetNode) {
    this.target = target;
  }

  public async scrape(): Promise<Response<string>> {
    console.log(`Starting scrape of ${this.target.statusUrl}`);
    const result = await got(this.target.statusUrl);
    return result;
  }
}
