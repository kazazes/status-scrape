import { Request, Response } from "express";
import { StatusScrapeTargetNode } from "../../prisma/dist/";
import { StatusPageStrategy } from "./strategies/statusPageStrategy";
import { ScraperStrategy } from "./strategies/strategy";

exports.scrape = async (req: Request, res: Response) => {
  const target = req.body.target as StatusScrapeTargetNode;
  const { strategy, statusUrl } = target;

  let scraper: ScraperStrategy;

  switch (strategy) {
    case "STATUSPAGE":
      scraper = new StatusPageStrategy(statusUrl);
      break;
    default:
      res.sendStatus(500).send("Invalid scraper strategy.");
      break;
  }

  const results = await scraper.scrape();
  return results;
};
