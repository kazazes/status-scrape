import { logger } from "@status-scrape/common";
import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated";
import { resolvers } from "./resolvers";

dotenv.config();

const server = new GraphQLServer({
  resolvers,
  typeDefs: "schema.graphql",
  context: req => {
    return {
      ...req,
      db: prisma
    };
  }
});

server.start(
  {
    port: process.env.PORT || 4000,
    endpoint: "/graphql",
    playground: "/graphql"
  },
  () => {
    logger.info(
      `Server is running on http://localhost:${process.env.PORT ||
        4000}/graphql`
    );
  }
);
