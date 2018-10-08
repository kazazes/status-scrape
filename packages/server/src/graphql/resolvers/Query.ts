import {
  prisma,
  StatusScrapeJobWhereUniqueInput,
  StatusScrapeTargetWhereUniqueInput
} from "@status-scrape/prisma";
import { ScrapeController } from "../../controllers/scrapeController";
import { getUserId, isAuthenticated } from "../../utils";
import { IApolloContext } from "../apollo";
import { ILoginArgs } from "./Mutation";

// tslint:disable-next-line:variable-name
export const Query = {
  me: (obj: any, args: ILoginArgs, ctx: IApolloContext, info: any) => {
    const id = getUserId(ctx);
    return ctx.db.user({ id });
  },
  startScrape: async (
    parent: any,
    args: { target: StatusScrapeJobWhereUniqueInput },
    ctx: IApolloContext
  ) => {
    await isAuthenticated(ctx);
    const target = await prisma.statusScrapeTarget(args.target);
    const node = await prisma.statusScrapeTarget({ id: target.id });
    new ScrapeController(node).scrape();
  },
  target: async (
    obj: any,
    args: { target: StatusScrapeTargetWhereUniqueInput },
    ctx: IApolloContext
  ) => {
    await isAuthenticated(ctx);
    return prisma.statusScrapeTarget(args.target);
  },
  lastScrape: async (
    obj: any,
    args: { target: StatusScrapeTargetWhereUniqueInput },
    ctx: IApolloContext
  ) => {
    await isAuthenticated(ctx);
    const jobs = await prisma.statusScrapeJobs({
      where: { target: args.target, status: "DONE" },
      orderBy: "createdAt_DESC",
      first: 1
    });
    if (jobs.length > 0) {
      return jobs[0];
    } else {
      return undefined;
    }
  },
  listTargets: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    await isAuthenticated(ctx);
    return prisma.statusScrapeTargets({ orderBy: "name_ASC" }).$fragment(`
      fragment TargetWithLastResult on StatusScrapeTarget {
        id
        name
        twitterHandle
        statusUrl
        strategy
        companyUrl
        results(orderBy:createdAt_DESC, first:1) {
          updatedAt
          status
        }
      }`);
  },
  statusScrapeJobs: async (
    obj: any,
    args: any,
    ctx: IApolloContext,
    info: any
  ) => {
    await isAuthenticated(ctx);
    return prisma.statusScrapeJobs(args);
  }
};
