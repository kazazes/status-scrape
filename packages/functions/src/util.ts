import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IVerifiedToken {
  userId?: any;
  machine?: boolean;
}

export function isAuthenticated(req: Request, res: Response) {
  // tslint:disable-next-line:variable-name
  const Authorization = req.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    try {
      const verifiedToken = verify(
        token,
        process.env.APP_SECRET
      ) as IVerifiedToken;
      return verifiedToken.machine !== undefined && verifiedToken.machine;
    } catch (e) {
      res.status(403).send(new AuthError());
      return false;
    }
  }

  res.status(403).send(new AuthError());
  return false;
}

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
