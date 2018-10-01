import supertest from "supertest";
import { app, token } from "./setup";

describe("Scrape metastatuspage.com", () => {
  test(
    "It should succeed",
    async () => {
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
    },
    20000
  );
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
