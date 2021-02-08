"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xss = require('xss');
const config = require('config');
module.exports = function (req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        const body = JSON.stringify(req.body);
        if (body) {
            req.body = JSON.parse(xss(body));
        }
    }
    req.url = xss(req.url);
    next();
};
//# sourceMappingURL=xss.js.map