import { prisma, StatusScrapeJobWhereUniqueInput } from "@status-scrape/prisma";
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
    obj: any,
    args: { target: StatusScrapeJobWhereUniqueInput },
    ctx: IApolloContext,
    info: any
  ) => {
    await isAuthenticated(ctx);
    const target = await prisma.statusScrapeTarget(args.target);
    const node = await prisma.statusScrapeTarget({ id: target.id });
    new ScrapeController(node).scrape();
  },
  listTargets: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    await isAuthenticated(ctx);
    return prisma.statusScrapeTargets({ orderBy: "name_ASC" }).$fragment(`
      fragment TargetWithLastResult on StatusScrapeTarget {
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
  }
};
