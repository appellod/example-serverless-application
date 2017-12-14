import * as express from "express";
import * as path from "path";

import { Mongoose } from "../lib/mongoose";

export class DocumentationController {
  constructor(app: express.Application) {
    /**
     * Redirects the user to the login form if they are not logged in.
     */
    app.get("/", (req, res) => {
      if (req.session.isLoggedIn) {
        res.redirect('/apidoc/index.html');
      } else {
        res.redirect('/login.html');
      }
    });

    /**
     * Redirects the user to the login form if they are not logged in.
     */
    app.get("/apidoc*", (req, res) => {
      if (req.session.isLoggedIn) {
        const file = req.originalUrl.split("?")[0];
        res.sendFile(path.resolve(__dirname + "/../public" + file));
      } else {
        res.redirect('/login.html');
      }
    });

    /**
     * Logs the user in if the username and password are correct and redirects
     * them to documentation page.
     */
    app.post('/login', async (req, res) => {
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
};