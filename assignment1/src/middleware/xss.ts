import { NextFunction, Request, Response } from 'express';
const xss = require('xss');
const config = require('config');

module.exports = function (req: Request, res: Response, next: NextFunction) {
  if (req.method === 'POST' || req.method === 'PUT') {
    const body = JSON.stringify(req.body);
    if (body) {
      req.body = JSON.parse(xss(body));
    }
  }
  req.url = xss(req.url);
  next();
};
