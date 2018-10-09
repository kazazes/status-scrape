import { logger } from '../src';

describe("Logger", () => {
  test("Should create a logger", () => {
    expect(typeof logger.log).toBe("function");
  });
});

