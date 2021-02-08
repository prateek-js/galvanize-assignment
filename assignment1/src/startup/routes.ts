import * as express from 'express';
import { productControllerRouter } from '../routes/product/product.controller';
import { errorMiddleware } from '../middleware/error';
import { Application } from 'express';
const swaggerUi = require('swagger-ui-express');
import * as specs from './swagger';

module.exports = function (app: Application) {
  app.use(express.json());
  app.use('/api/v1/product', productControllerRouter);
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs.default));
  app.use(errorMiddleware);
};
