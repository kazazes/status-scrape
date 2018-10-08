import { default as $ } from "cheerio";
import { Page } from "puppeteer";
import scrapeIt from "scrape-it";
import { StatusScrapeTargetNode } from "../prisma";
import { IParsedCategory, ScraperStrategy } from "./strategy";

export class StatuspageStrategy extends ScraperStrategy {
  constructor(target: StatusScrapeTargetNode) {
    super(target);
    this.strategy = "STATUSPAGE_IO";
    this.interceptUrls.push("index.json");
  }

  public parse() {
    const parsed: any = scrapeIt.scrapeHTML($.load(this.scraped.dom), {
      groups: {
        listItem: ".is-group",
        data: {
          category: ".fa-minus-square-o+ span",
          components: {
            listItem: ".child-components-container div[class*='status-']",
            data: {
              name: ".name",
              status: {
                selector: ".component-status",
                convert: (status: string) => {
                  switch (status.toLowerCase().trim()) {
                    case "operational":
                      return "OPERATIONAL";
                    case "re-routed":
                      return "REROUTED";
                    case "under maintenance":
                      return "MAINTENANCE";
                    default:
                      return "UNKNOWN";
                  }
                }
              }
            }
          }
        }
      }
    });
    return parsed.groups as IParsedCategory[];
  }

  protected async manipulateScrapedPage(page: Page) {
    return page.evaluate("$('.group-parent-indicator').click()");
  }
}
