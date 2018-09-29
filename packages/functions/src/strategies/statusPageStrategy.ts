import { ScraperStrategy } from "./strategy";

export class StatusPageStrategy extends ScraperStrategy {
  public url: string;
  constructor(url: string) {
    super(url);
    this.strategy = "STATUSPAGE";
  }

  public async scrape() {
    return {};
  }
}
