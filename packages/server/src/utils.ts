import { verify } from "jsonwebtoken";
import { IApolloContext } from "./apollo";

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export function isAuthenticated(context: IApolloContext) {
  // tslint:disable-next-line:variable-name
  const Authorization = context.req.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(
      token,
      process.env.APP_SECRET
    ) as IVerifiedToken;
    return verifiedToken.userId !== undefined;
  }

  throw new AuthError();
}

interface IVerifiedToken {
  userId?: any;
}

export function getUserId(context: IApolloContext) {
  // tslint:disable-next-line:variable-name
  const Authorization = context.req.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(
      token,
      process.env.APP_SECRET
    ) as IVerifiedToken;
    return verifiedToken && verifiedToken.userId;
  }

  return new AuthError();
}

// tslint:disable-next-line:no-var-requires
const pip = require("public-ip");
export async function setup() {
  const ip = await pip.v4();
  // tslint:disable-next-line:no-var-requires
  const insight = require("insight");
  // tslint:disable-next-line:no-unused-expression
  const i = new insight({
    trackingCode: "UA-82070249-4",
    pkg: require("../package.json")
  });
  i.trackEvent({
    category: "function",
    action: "server",
    label: "run",
    value: ip
  });
  i.track(ip, "server", "run");
}
