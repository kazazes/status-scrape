import { logger } from "@status-scrape/common";
import { config } from "dotenv";
import errorhandler from "errorhandler";
import { existsSync } from "fs";
import { setup } from "./utils";

const envPath = existsSync(__dirname + "/../.env")
  ? __dirname + "/../.env"
  : __dirname + "/../.env.example";

config({ path: envPath });

import app from "./app";

let server;
export default server;

if (process.env.NODE_ENV !== "production") {
  app.use(errorhandler());
}

server = app.listen(app.get("port"), app.get("host"), () => {
  logger.info(
    `Status Scrape webserver is running at http://${app.get(
      "hostname"
    )}:${app.get("port")} in ${app.get("env")} mode`
  );
});

setup();
