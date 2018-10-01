import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { sign } from "jsonwebtoken";
import supertest from "supertest";
import { statusScrape } from "./scrape";

dotenv.config();

export const app = express();
export const token = sign({ machine: true }, process.env.APP_SECRET, {
  expiresIn: "1h"
});
app.use(bodyParser.json());
app.post("/statusScrape", statusScrape);
supertest(app);

supertest(app)
  .post("/statusScrape")
  .send({
    target: {
      name: "Statuspage",
      twitterHandle: "statuspage",
      strategy: "STATUSPAGE_IO",
      statusUrl: "https://metastatuspage.com/"
    }
  })
  .set("Content-Type", "application/json")
  .set("Authorization", `Bearer ${token}`);
