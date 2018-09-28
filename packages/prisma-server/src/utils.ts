import { verify } from "jsonwebtoken";

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

interface IVerifiedToken {
  userId?: any;
}

export function getUserId(context: any) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(
      token,
      process.env.APP_SECRET
    ) as IVerifiedToken;
    return verifiedToken && verifiedToken.userId;
  }

  throw new AuthError();
}
