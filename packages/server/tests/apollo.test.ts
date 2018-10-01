import { ApolloServer } from "apollo-server-express";
import apollo from "../src/graphql/apollo";

describe("apollo", () => {
  test("Should export an apollo server", () => {
    expect(apollo).toBeInstanceOf(ApolloServer);
  });
});
