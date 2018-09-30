import cheerio from "cheerio";
import {
  StatusScrapeResultCreateInput,
  StatusScrapeTargetNode
} from "../prisma";
import { ScraperStrategy } from "./strategy";

export class StatuspageStrategy extends ScraperStrategy {
  constructor(target: StatusScrapeTargetNode) {
    super(target);
    this.strategy = "STATUSPAGE_IO";
  }

  public async parse() {
    const $ = cheerio.load(this.dom);
    const components = $("body div.component-container");
    const categories = components.map(component => {
      const title = $(component)
        .find("span.name")
        .first()
        .text()
        .trim();

      const items = $(component).find("component-inner-container");
      return [title, items];
    });
    categories.empty();
    const inputs: StatusScrapeResultCreateInput[] = [];
    return inputs;
  }
}
