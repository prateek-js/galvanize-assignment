"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.BusinessError = void 0;
const constants_1 = require("../helper/constants");
class BusinessError extends Error {
    constructor(statusCode, message, innerException) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'BusinessError';
        this.innerException = innerException;
    }
}
exports.BusinessError = BusinessError;
function errorMiddleware(err, req, res, next) {
    console.error(err.message, err);
    if (err instanceof BusinessError) {
        res.status(err.statusCode).json(err.message);
    }
    else if (err.statusCode) {
        res.status(err.statusCode).json(err.message);
    }
    else {
        res.status(500).json(constants_1.errorMessages.genericErrorMessage);
    }
    //next(err);
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.js.map