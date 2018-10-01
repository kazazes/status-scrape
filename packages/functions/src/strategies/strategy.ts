import { PathLike } from "fs";
import mkdirp from "mkdirp";
import puppeteer, { Page, Response } from "puppeteer";
import {
  ScrapeStrategy,
  StatusScrapeTargetNode,
  SystemStatus
} from "../prisma";

export abstract class ScraperStrategy {
  public scraped: IScrapeResponse;
  protected target: StatusScrapeTargetNode;
  protected strategy: ScrapeStrategy;
  protected interceptUrls: string[]; // Matches the end of a URL and stores request in this.scraped
  constructor(target: StatusScrapeTargetNode) {
    this.interceptUrls = [];
    this.target = target;
  }

  public async scrape(): Promise<IScrapeResponse> {
    console.log(`Starting scrape of ${this.target.statusUrl}`);

    const browser = await puppeteer.launch({ args: ["--no-sandbox"] }); // no sandbox required to run as root in GC Functions
    const page = await browser.newPage();

    const interceptedResponses: IInterceptedResponse[] = [];
    page.on("requestfinished", req => {
      this.interceptUrls.forEach(async targetUrl => {
        if (req.url().endsWith(targetUrl)) {
          interceptedResponses.push({
            targetUrl,
            url: req.url(),
            response: req.response(),
            body: await req.response().text()
          });
        }
      });
    });

    page.setViewport({ height: 768, width: 1366, deviceScaleFactor: 2 });
    const response = await page.goto(this.target.statusUrl, {
      waitUntil: "networkidle2"
    });

    await this.manipulateScrapedPage(page);
    const screenshotPath = `/tmp/status-scrape/${
      this.target.name
    }-${new Date().getTime()}.png`;
    await this.screenshot(page, screenshotPath);

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

  public abstract parse(): IParsedCategory[];
  protected abstract async manipulateScrapedPage(page: Page): Promise<any>;

  protected async screenshot(page: Page, path: string) {
    mkdirp.sync("/tmp/status-scrape", {});
    return page.screenshot({
      path,
      fullPage: true,
      type: "png"
    });
  }
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
  response: Response;
  body: string;
}

export interface IParsedCategory {
  category: string;
  components: [{ name: string; status: SystemStatus }];
}
