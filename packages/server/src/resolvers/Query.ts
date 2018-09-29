import { logger } from "@status-scrape/common";
import { StatusScrapeTargetNode } from "@status-scrape/prisma";
import { getUserId } from "../utils";
import { ILoginArgs } from "./Mutation";

// tslint:disable-next-line:variable-name
export const Query = {
  me: (obj: any, args: ILoginArgs, ctx: any, info: any) => {
    return ctx.db.user({ id: getUserId(ctx) });
  },
  startScrape: (
    obj: any,
    args: { target: StatusScrapeTargetNode },
    ctx: any,
    info: any
  ) => {
    const { target } = args;
    // prisma.statusScrapeTarget(target);
    logger.info(`Starting scrape of ${target.name} (${target.statusUrl})`);
  }
};
