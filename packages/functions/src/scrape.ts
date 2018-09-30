import dotenv from "dotenv";
import { Request, Response } from "express";

import { StatusScrapeTargetNode } from "./prisma";
import { StatuspageStrategy } from "./strategies/statuspageStrategy";
import { ScraperStrategy } from "./strategies/strategy";
import { isAuthenticated } from "./util";

export const statusScrape = async (req: Request, res: Response) => {
  dotenv.config();
  if (!isAuthenticated(req, res)) {
    return false;
  }

  if (req.body.target === undefined) {
    console.error("No target in body. Aborting.");
    return res.send(400);
  }

  const target = req.body.target as StatusScrapeTargetNode;

  let scraper: ScraperStrategy;

  switch (target.strategy) {
    case "STATUSPAGE_IO":
      scraper = new StatuspageStrategy(target);
      break;
    default:
      return res.status(500).send("Invalid scraping strategy.");
  }

  const result = await scraper.scrape();
  return res.send(result.headers);
};
