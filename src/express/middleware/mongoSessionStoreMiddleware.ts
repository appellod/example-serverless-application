import * as connectMongo from "connect-mongo";
import * as express from "express";
import * as mongoose from "mongoose";
import * as session from "express-session";

export function mongoSessionStoreMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const MongoStore = connectMongo(session);
  const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: "this is a super secret that only the server should know",
    store: new MongoStore({
      collection: "sessions",
      mongooseConnection: mongoose.connection
    })
  });

  sessionMiddleware(req, res, next);
}
