import { logger } from "@status-scrape/common";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import enforceHTTPS from "express-enforces-ssl";
import expressHealthcheck from "express-healthcheck";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import apollo from "./graphql/apollo";

dotenv.config();

const app = express();
const staticPath = path.join(`${__dirname}"/../../frontend/dist/`);

app.set("port", process.env.PORT || 3000);
app.set("hostname", process.env.HOST || "127.0.0.1");
app.set("views", "./views");
app.set("view engine", "pug");

app.enable("trust proxy");
app.use(helmet());
<<<<<<< HEAD
=======
debugger;
>>>>>>> 51cbf64d4a92b7897eea7b52715d3e052c7a5634
if (app.get("env") === "production") {
  app.use(enforceHTTPS());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(staticPath, { maxAge: 31557600000 }));

app.use(
  cookieSession({
    secret: process.env.APP_SECRET,
    maxAge: 60 * 60 * 1000,
    httpOnly: false
  })
);

app.use("/liveness_check", expressHealthcheck());
app.use("/readiness_check", expressHealthcheck());
apollo.applyMiddleware({ app });

const morganFormat: string =
  process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message: string) =>
        logger.debug(message.substring(0, message.lastIndexOf("\n")))
    }
  })
);

export default app;
