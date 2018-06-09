import * as ejs from "ejs";
import * as express from "express";
import * as path from "path";

import { User } from "../mongoose";

export class Documentation {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;

    this.setupRoutes();
  }

  private setupRoutes() {
    /**
     * Sends user to API documentation if they are logged in or to login if they are not.
     */
    this.app.get("/", (req, res) => {
      if (req.session.isLoggedIn) {
        res.redirect("/apidoc/index.html");
      } else {
        res.redirect("/login.html");
      }
    });

    /**
     * Loads static API documentation file if they are logged in.
     */
    this.app.get("/apidoc*", (req, res) => {
      if (req.session.isLoggedIn) {
        const file = req.originalUrl.split("?")[0].replace("/", "");
        res.sendFile(path.resolve(__dirname, "public", file));
      } else {
        res.redirect("/login.html");
      }
    });

    /**
     * Loads login resources without requiring the user to be logged in.
     */
    this.app.get(["/login.html", "/css/login.css", "/js/login.js"], (req, res) => {
      const file = req.originalUrl.split("?")[0].replace("/", "");
      res.sendFile(path.resolve(__dirname, "public", file));
    });

    /**
     * Logs the user in if the username and password are correct and redirects
     * them to documentation page.
     */
    this.app.post("/login", async (req, res) => {
      try {
        const user = await User.findOne({ email: req.body.email });

        if (user && user.isValidPassword(req.body.password)) {
          req.session.isLoggedIn = true;
          res.send();
        } else {
          req.session.isLoggedIn = false;
          res.status(400).json({ error: "Incorrect email address or password." });
        }
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
    });
  }
}
