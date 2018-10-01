import dotenv from "dotenv";
import { Request, Response } from "express";
import { existsSync } from "fs";
import { verify } from "jsonwebtoken";

interface IVerifiedToken {
  userId?: any;
  machine?: boolean;
}

export function isAuthenticated(req: Request, res: Response) {
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

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export function setup() {
  dotenv.config();
  if (process.env.NODE_ENV !== "test") {
    // tslint:disable-next-line:no-var-requires
    const insight = require("insight");
    // tslint:disable-next-line:no-unused-expression
    const i = new insight({
      trackingCode: "UA-82070249-4",
      pkg: existsSync("../package.json")
        ? require("../package.json")
        : require("./package.json")
    });
    i.trackEvent({
      category: "function",
      action: process.env.FUNCTION_NAME || "scrape",
      label: "run",
      value: process.env.GCP_PROJECT || "local"
    });
    i.track(
      process.env.GCP_PROJECT || "local",
      process.env.FUNCTION_NAME || "scrape"
    );
  }
}
