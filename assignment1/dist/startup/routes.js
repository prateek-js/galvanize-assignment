"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const product_controller_1 = require("../routes/product/product.controller");
const error_1 = require("../middleware/error");
const swaggerUi = require('swagger-ui-express');
const specs = require("./swagger");
module.exports = function (app) {
    app.use(express.json());
    app.use('/api/v1/product', product_controller_1.productControllerRouter);
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs.default));
    app.use(error_1.errorMiddleware);
};
//# sourceMappingURL=routes.js.map