import { Request, Response } from "express";

import { StatusScrapeTargetNode } from "./prisma";
import { StatuspageStrategy } from "./strategies/statuspageStrategy";
import { ScraperStrategy } from "./strategies/strategy";
import { isAuthenticated, setup } from "./util";

export const statusScrape = async (req: Request, res: Response) => {
  setup();
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
      return res.sendStatus(500);
  }

  await scraper.scrape();
  const result = await scraper.parse();
  return res.send({ target, result, dom: scraper.scraped.dom });
};
