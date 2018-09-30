import dotenv from "dotenv";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { StatusScrapeTargetNode } from "./prisma";
import { StatusPageStrategy } from "./strategies/statusPageStrategy";
import { ScraperStrategy } from "./strategies/strategy";

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
      scraper = new StatusPageStrategy(target);
      break;
    default:
      return res.status(500).send("Invalid scraping strategy.");
  }

  const result = await scraper.scrape();
  return res.send(result.headers);
};

interface IVerifiedToken {
  userId?: any;
  machine?: boolean;
}

function isAuthenticated(req: Request, res: Response) {
  // tslint:disable-next-line:variable-name
  const Authorization = req.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    try {
      const verifiedToken = verify(
        token,
        process.env.APP_SECRET
      ) as IVerifiedToken;
      return verifiedToken.machine !== undefined && verifiedToken.machine;
    } catch (e) {
      res.status(403).send(new AuthError());
      return false;
    }
  }

  res.status(403).send(new AuthError());
  return false;
}

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
