import bodyParser from "body-parser";
import compression from "compression"; // compresses requests
import dotenv from "dotenv";
import express from "express";
import expressFlash from "express-flash";
import { default as session } from "express-session";
import expressValidator from "express-validator";
import lusca from "lusca";
import path from "path";

import * as homeController from "./controllers/home";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  })
);
app.use(expressFlash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.get("/", homeController.index);

export default app;
