import { StatuspageStrategy } from "./strategies/statuspageStrategy";

const strategy = new StatuspageStrategy({
  id: "",
  name: "Statuspage",
  twitterHandle: "statuspage",
  strategy: "STATUSPAGE_IO",
  statusUrl: "https://metastatuspage.com/"
});

async function mockScrape() {
  await strategy.scrape();
  await strategy.parse();
}

mockScrape();
