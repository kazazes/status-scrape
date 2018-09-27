import { default as errorHandler } from "errorhandler";
import logger from "./util/logger";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  logger.info(
    `App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  );
  logger.verbose("Press CTRL-C to stop\n");
});

export default server;
