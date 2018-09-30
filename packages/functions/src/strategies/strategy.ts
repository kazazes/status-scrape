import got, { Response } from "got";
import {
  ScrapeStrategy,
  StatusScrapeResultCreateInput,
  StatusScrapeTargetNode
} from "../prisma";

export abstract class ScraperStrategy {
  protected target: StatusScrapeTargetNode;
  protected strategy: ScrapeStrategy;
  protected dom: string;
  protected responseHeaders: any;
  constructor(target: StatusScrapeTargetNode) {
    this.target = target;
  }

  public async scrape(): Promise<Response<string>> {
    console.log(`Starting scrape of ${this.target.statusUrl}`);
    const result = await got(this.target.statusUrl);
    this.dom = result.body;
    this.responseHeaders = result.headers;
    return result;
  }

  public abstract async parse(): Promise<StatusScrapeResultCreateInput[]>;
}
