import { prisma, StatusScrapeTargetNode } from "@status-scrape/prisma";
import { ScrapeController } from "../../controllers/scrapeController";
import { getUserId } from "../../utils";
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
    args: { target: StatusScrapeTargetNode },
    ctx: IApolloContext,
    info: any
  ) => {
    const { target } = args;
    const node = await prisma.statusScrapeTarget({ id: target.id });
    new ScrapeController(node).scrape();
  }
};
