import { Request } from "express";
import { importSchema } from "graphql-import";
import { prisma } from "../../prisma/dist";
import { resolvers } from "./resolvers";

import { Config } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

const typeDefs = importSchema(__dirname + "/../schema.graphql");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

const apolloConfig: Config = {
  schema,
  context: (req: Request) => {
    return {
      ...req,
      db: prisma
    };
  }
};

const server = new ApolloServer(apolloConfig);

export default server;
