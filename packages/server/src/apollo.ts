import { Request, Response } from "express";
import { importSchema } from "graphql-import";
import { prisma, Prisma } from "../../prisma/dist";
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
  },
  allowUndefinedInResolve: false
});

export interface IApolloContext {
  db: Prisma;
  req: Request;
  res: Response;
}

const apolloConfig: Config = {
  schema,
  context: (ctx: any) => {
    const context: IApolloContext = {
      req: ctx.req,
      res: ctx.res,
      db: prisma
    };
    return context;
  },
  debug: true
};

const server = new ApolloServer(apolloConfig);

export default server;
