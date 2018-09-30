import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { sign } from "jsonwebtoken";
import supertest from "supertest";
import { statusScrape } from "../src/scrape";

dotenv.config();

const app = express();
const token = sign({ machine: true }, process.env.APP_SECRET, {
  expiresIn: "1h"
});
app.use(bodyParser.json());
app.post("/statusScrape", statusScrape);
supertest(app);

describe("Scrape metastatuspage.com", () => {
  test("It should succeed", async () => {
    const response = await supertest(app)
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

    expect(response.status).toBe(200);
  });
});

describe("Send request without target", () => {
  test("It should 400", async () => {
    const response = await supertest(app)
      .post("/statusScrape")
      .send({})
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});

describe("Send request with missing parsing strategy", () => {
  test("It should 500", async () => {
    const response = await supertest(app)
      .post("/statusScrape")
      .send({
        target: {
          name: "Statuspage",
          twitterHandle: "statuspage",
          statusUrl: "https://metastatuspage.com/"
        }
      })
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);
  });
});

describe("Send request with bad token", () => {
  test("It should 500", async () => {
    const badToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const response = await supertest(app)
      .post("/statusScrape")
      .send({
        target: {
          name: "Statuspage",
          twitterHandle: "statuspage",
          statusUrl: "https://metastatuspage.com/"
        }
      })
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${badToken}`);

    expect(response.status).toBe(403);
  });
});

describe("Send request with no authorization header", () => {
  test("It should 500", async () => {
    const response = await supertest(app)
      .post("/statusScrape")
      .send({
        target: {
          name: "Statuspage",
          twitterHandle: "statuspage",
          statusUrl: "https://metastatuspage.com/"
        }
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(403);
  });
});
