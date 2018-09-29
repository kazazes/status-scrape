import { ScrapeStrategy, StatusScrapeTargetNode } from "../../../prisma/dist/";

export abstract class ScraperStrategy {
  public target: StatusScrapeTargetNode;
  public strategy: ScrapeStrategy;
  constructor(target: StatusScrapeTargetNode) {
    this.target = target;
  }

  public abstract async scrape(): Promise<any>;
}
