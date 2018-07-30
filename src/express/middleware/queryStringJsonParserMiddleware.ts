import * as express from "express";

export function queryStringJsonParserMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.query && req.query.query) {
    try {
      req.query = JSON.parse(req.query.query);
      return next();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    return next();
  }
}
