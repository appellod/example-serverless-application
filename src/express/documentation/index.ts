import * as express from "express";
import * as path from "path";

import { Mongoose } from "../../mongoose";

export class DocumentationController {
  constructor(app: express.Application) {
    /**
     * Sends user to API documentation if they are logged in.
     */
    app.get("/", (req, res) => {
      if (!this.isLoggedIn(req, res)) {
        return;
      }

      res.redirect("/apidoc/index.html");
    });

    /**
     * Loads static API documentation file if they are logged in.
     */
    app.get("/apidoc*", (req, res) => {
      if (!this.isLoggedIn(req, res)) {
        return;
      }

      const file = req.originalUrl.split("?")[0];
      res.sendFile(path.resolve(__dirname + "/../documentation/public" + file));
    });

    /**
     * Logs the user in if the username and password are correct and redirects
     * them to documentation page.
     */
    app.post("/login", async (req, res) => {
      try {
        const user = await Mongoose.User.findOne({ email: req.body.email });

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

  public isLoggedIn(req: express.Request, res: express.Response): boolean {
    if (!req.session.isLoggedIn) {
      res.redirect("/login.html");
    }

    return req.session.isLoggedIn;
  }
}
