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
