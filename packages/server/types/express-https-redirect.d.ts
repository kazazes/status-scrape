import { Handler } from "express";

export = express_https_redirect;

declare function express_https_redirect(redirectLocalhost?: boolean): Handler;

declare namespace express_https_redirect {
  const prototype: {};
}
