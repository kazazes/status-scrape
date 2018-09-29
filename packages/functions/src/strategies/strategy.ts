import { ScrapeStrategy } from "../../../prisma/dist/";

export abstract class ScraperStrategy {
  public url: string;
  public strategy: ScrapeStrategy;
  constructor(url: string) {
    this.url = url;
  }

  public abstract async scrape(): Promise<any>;
}
