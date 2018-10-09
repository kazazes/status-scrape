import supertest = require("supertest");
import app from "../src/app";

describe("Should return health checks", () => {
  test("It should implement /readiness_check", async () => {
    const response = await supertest(app).get("/readiness_check");

    expect(response.status).toBe(200);
  });

  test("It should implement /liveness_check", async () => {
    const response = await supertest(app).get("/liveness_check");

    expect(response.status).toBe(200);
  });
});
