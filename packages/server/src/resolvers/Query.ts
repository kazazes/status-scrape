import { getUserId } from "../utils";
import { ILoginArgs } from "./Mutation";

// tslint:disable-next-line:variable-name
export const Query = {
  me: (obj: any, args: ILoginArgs, ctx: any, info: any) => {
    return ctx.db.user({ id: getUserId(ctx) });
  }
};
