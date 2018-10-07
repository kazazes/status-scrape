import { StatuspageStrategy } from "./strategies/statuspageStrategy";

const strategy = new StatuspageStrategy({
  id: "cjmnwu8fmfd470b77ir3v5c9e",
  name: "Statuspage",
  twitterHandle: "statuspage",
  strategy: "STATUSPAGE_IO",
  companyUrl: "statuspage.io",
  statusUrl: "https://metastatuspage.com/"
});

async function mockScrape() {
  await strategy.scrape();
  await strategy.parse();
}

mockScrape();
