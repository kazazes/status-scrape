import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AuthError } from "../utils";

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
    if (process.env.SIGNUP_ENABLED) {
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
    }

    return new AuthError();
  }
};
