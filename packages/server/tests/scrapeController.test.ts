import { StatusScrapeTargetNode } from "@status-scrape/prisma";
import dotenv from "dotenv";
import { ScrapeController } from "../src/controllers/scrapeController";

let scrapeController: ScrapeController;
beforeAll(async () => {
  dotenv.config();
  const target: StatusScrapeTargetNode = {
    id: "cjmnwu8fmfd470b77ir3v5c9e",
    name: "Statuspage",
    twitterHandle: "statuspage",
    strategy: "STATUSPAGE_IO",
    statusUrl: "https://metastatuspage.com/"
  };
  scrapeController = new ScrapeController(target);
});

describe("scrapeController", () => {
  test(
    "It should have scrape results",
    async () => {
      await scrapeController.scrape();
      expect(scrapeController.results.length).toBeGreaterThan(0);
    },
    30000
  );
});
