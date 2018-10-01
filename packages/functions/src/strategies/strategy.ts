import { PathLike } from "fs";
import puppeteer, { Response } from "puppeteer";
import {
  ScrapeStrategy,
  StatusScrapeResultCreateInput,
  StatusScrapeTargetNode
} from "../prisma";

export abstract class ScraperStrategy {
  protected target: StatusScrapeTargetNode;
  protected strategy: ScrapeStrategy;
  protected interceptUrls: string[]; // Save the results of these requests when scraping
  protected scraped: IScrapeResponse;
  constructor(target: StatusScrapeTargetNode) {
    this.interceptUrls = [];
    this.target = target;
  }

  public async scrape(): Promise<IScrapeResponse> {
    console.log(`Starting scrape of ${this.target.statusUrl}`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.setRequestInterception(true);

    const interceptedResponses: IInterceptedResponse[] = [];
    page.on("requestfinished", req => {
      this.interceptUrls.forEach(targetUrl => {
        if (req.url().endsWith(targetUrl)) {
          interceptedResponses.push({
            targetUrl,
            url: req.url(),
            content: req.response()
          });
        }
      });
    });

    page.setViewport({ height: 768, width: 1366, deviceScaleFactor: 2 });
    const response = await page.goto(this.target.statusUrl);

    const screenshotPath = `/tmp/status-scrape/${this.target.name}.png`;
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      type: "png"
    });
    console.log("Saved screenshot to " + screenshotPath);

    const dom = await page.content();
    this.scraped = {
      response,
      dom,
      intercepted: interceptedResponses,
      screenshot: screenshotPath
    };
    browser.close();
    return this.scraped;
  }

  public abstract async parse(): Promise<StatusScrapeResultCreateInput[]>;
}

export interface IScrapeResponse {
  dom: string;
  intercepted: IInterceptedResponse[];
  response: Response;
  screenshot: PathLike;
}

export interface IInterceptedResponse {
  targetUrl: string;
  url: string;
  content: Response;
}
