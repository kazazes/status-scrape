import { Request, Response } from "express";
import { StatusScrapeTargetNode } from "../../prisma/dist/";
import { StatusPageStrategy } from "./strategies/statusPageStrategy";
import { ScraperStrategy } from "./strategies/strategy";

export const scrape = async (req: Request, res: Response) => {
  const target = req.body.target as StatusScrapeTargetNode;

  let scraper: ScraperStrategy;

  switch (target.strategy) {
    case "STATUSPAGE_IO":
      scraper = new StatusPageStrategy(target);
      break;
    default:
      res.sendStatus(500).send("Invalid scraper strategy.");
      break;
  }

  const results = await scraper.scrape();
  return results;
};
