import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { StatusScrapeTargetNode } from "../../prisma/";
import { StatusPageStrategy } from "./strategies/statusPageStrategy";
import { ScraperStrategy } from "./strategies/strategy";

export const statusScrape = async (req: Request, res: Response) => {
  isAuthenticated(req);

  if (req.body.target === undefined) {
    console.error("No target in body.");
    console.error(`${JSON.stringify(req.body, null, 2)}`);
    res.send(400);
  }

  const target = req.body.target as StatusScrapeTargetNode;

  let scraper: ScraperStrategy;

  switch (target.strategy) {
    case "STATUSPAGE_IO":
      scraper = new StatusPageStrategy(target);
      break;
    default:
      res.sendStatus(500).send("Invalid scraping strategy.");
      break;
  }

  const result = await scraper.scrape();
  res.status(200).send(result);
};

interface IVerifiedToken {
  userId?: any;
  machine?: boolean;
}

function isAuthenticated(req: Request) {
  // tslint:disable-next-line:variable-name
  const Authorization = req.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(
      token,
      process.env.APP_SECRET
    ) as IVerifiedToken;
    return verifiedToken.machine !== undefined && verifiedToken.machine;
  }

  throw new AuthError();
}

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
