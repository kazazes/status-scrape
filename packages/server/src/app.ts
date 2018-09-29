import { logger } from "@status-scrape/common";
import bodyParser from "body-parser";
import express from "express";
import expressSession from "express-session";
import morgan from "morgan";
import path from "path";
import apollo from "./apollo";

const app = express();
const env = process.env.NODE_ENV;

app.set("port", process.env.PORT || 3000);
app.set("hostname", process.env.HOST || "127.0.0.1");
app.set("views", "./views");
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const staticPath = path.join(`${__dirname}"/../../admin-frontend/dist/`);
app.use(express.static(staticPath, { maxAge: 31557600000 }));

app.locals.env = env;

app.use(
  expressSession({
    secret: process.env.APP_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      expires: false
    }
  })
);

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
