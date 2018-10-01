import supertest from "supertest";
import { app } from "./setup";

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
  test("It should 403", async () => {
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
