import { StatuspageStrategy } from "./strategies/statuspageStrategy";

const strategy = new StatuspageStrategy({
  id: "cjn01yw7mptlm0b48hvdp5pie",
  name: "Cloudflare",
  twitterHandle: "cloudflare",
  strategy: "STATUSPAGE_IO",
  statusUrl: "https://www.cloudflarestatus.com",
  companyUrl: "cloudflare.com"
});

async function mockScrape() {
  await strategy.scrape();
  await strategy.parse();
}

mockScrape();
