import { prisma, StatusScrapeTargetCreateInput } from "@status-scrape/prisma";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { isAuthenticated } from "../../utils";
import { IApolloContext } from "../apollo";

export interface ILoginArgs {
  name?: string;
  email?: string;
  password?: string;
}

// tslint:disable-next-line:variable-name
export const Mutation = {
  login: async (obj: any, args: ILoginArgs, ctx: any, info: any) => {
    const { email, password } = args;
    const user = await ctx.db.user({ email });

    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    return {
      user,
      // tslint:disable-next-line:object-literal-sort-keys
      token: sign({ userId: user.id }, process.env.APP_SECRET)
    };
  },
  signup: async (obj: any, args: ILoginArgs, ctx: any, info: any) => {
    await isAuthenticated(ctx);
    const hashedPassword = await hash(args.password, 10);
    const user = await ctx.db.createUser({
      email: args.email,
      name: args.name,
      password: hashedPassword
    });

    return {
      user,
      // tslint:disable-next-line:object-literal-sort-keys
      token: sign({ userId: user.id }, process.env.APP_SECRET)
    };
  },
  upsertScrapeTarget: async (
    obj: any,
    args: any,
    ctx: IApolloContext,
    info: any
  ) => {
    const data: StatusScrapeTargetCreateInput = args.data;
    await isAuthenticated(ctx);
    return prisma.upsertStatusScrapeTarget({
      where: { name: data.name },
      create: data,
      update: data
    });
  }
};
