import { prisma, StatusScrapeTargetNode } from "@status-scrape/prisma";
import { IApolloContext } from "../apollo";
import { ScrapeController } from "../scrapeController";
import { getUserId } from "../utils";
import { ILoginArgs } from "./Mutation";

// tslint:disable-next-line:variable-name
export const Query = {
  me: (obj: any, args: ILoginArgs, ctx: IApolloContext, info: any) => {
    return ctx.db.user({ id: getUserId(ctx) });
  },
  startScrape: async (
    obj: any,
    args: { target: StatusScrapeTargetNode },
    ctx: IApolloContext,
    info: any
  ) => {
    const { target } = args;
    const node = await prisma.statusScrapeTarget({ id: target.id });
    new ScrapeController(node).scrape();
  }
};
