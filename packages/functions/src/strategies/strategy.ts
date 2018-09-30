import { Response } from "got";
import { ScrapeStrategy, StatusScrapeTargetNode } from "../prisma";
export abstract class ScraperStrategy {
  public target: StatusScrapeTargetNode;
  public strategy: ScrapeStrategy;
  constructor(target: StatusScrapeTargetNode) {
    this.target = target;
  }

  public abstract async scrape(): Promise<Response<string>>;
}
