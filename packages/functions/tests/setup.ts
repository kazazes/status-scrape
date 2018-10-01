import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { sign } from "jsonwebtoken";
import supertest from "supertest";
import { statusScrape } from "../src/scrape";

dotenv.config();

export const app = express();
export const token = sign({ machine: true }, process.env.APP_SECRET, {
  expiresIn: "1h"
});
app.use(bodyParser.json());
app.post("/statusScrape", statusScrape);
supertest(app);
