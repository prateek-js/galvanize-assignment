import { ProductDto } from './product.dto';
import * as express from 'express';
export const productControllerRouter = express.Router();
import { ProductService } from './product.service';
import { ResponseMessage } from '../../helper/responseMessage';
import { sucessMessages, statusCodes } from '../../helper/constants';
import { v4 as uuidv4, validate } from 'uuid';
import { BusinessError } from '../../middleware/error';

/**
 * @swagger
 *
 * /api/v1/product:
 *   post:
 *     description: register a product
 *     produces:
 *       - application/json
 *     tags:
 *       - product
 *     parameters:
 *       - name: product
 *         description: json payload to create a product
 *         in: body
 *         schema:
 *           type: object
 *           required:
 *             - productName
 *             - cost
 *           properties:
 *             productName:
 *               type: string
 *               example: Pears
 *             description:
 *               type: string
 *               example: product description
 *             cost:
 *               type: number
 *               example: 400
 *     responses:
 *       200:
 *         description: product created successfully
 *         schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *               message:
 *                 type: string
 *                 example: product created successfully
 *       400:
 *         description: bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: permission denied
 *       5XX:
 *         description: Unexpected error
 */

productControllerRouter.post(
  '/',
  async function (req, res) {
    const ps = new ProductService();
    let productDto = ps.constructproductDto(req.body as ProductDto);
    await productDto.validate();
    await ps.createProduct(productDto);
    res
      .status(statusCodes.SUCESSS)
      .json(new ResponseMessage(sucessMessages.productAdded, {}));
  }
);

/**
 * @swagger
 *
 * /api/v1/product/{productId}:
 *   get:
 *     description: get the details of a given product
 *     produces:
 *       - application/json
 *     tags:
 *       - product
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: productid of the product to fetch
 *         required: true
 *         schema:
 *           type: string
 *           example: 552fffa1-9df7-41d9-acca-5fef29a83830
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *         description: type of currency
 *     responses:
 *       200:
 *         description: details of the given product
 *         schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   product:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         example: 552fffa1-9df7-41d9-acca-5fef29a83830
 *                       productName:
 *                         type: string
 *                         example: Pears
 *                       description:
 *                         type: string
 *                         example: product description
 *                       cost:
 *                         type: number
 *                         example: 400
 *                       viewCount:
 *                         type: number
 *                         example: 2
 *               message:
 *                 type: string
 *                 example: product fetched successfully
 *       400:
 *         description: bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: permission denied
 *       5XX:
 *         description: Unexpected error
 */

productControllerRouter.get(
  '/:productid',
  async function (req, res) {
    const ps = new ProductService();
    let queryParams = req.query;
    let productId = req.params['productid'];
    let product = await ps.getProduct(productId, queryParams);
    res.status(statusCodes.SUCESSS).json(
      new ResponseMessage(sucessMessages.productFetched, {
        product: product,
      })
    );
  }
);

/**
 * @swagger
 *
 * /api/v1/product:
 *   get:
 *     description: get most viewed products
 *     produces:
 *       - application/json
 *     tags:
 *       - product
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The numbers of items to return
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *         description: type of currency
 *     responses:
 *       200:
 *         description: list of products
 *         schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                           example: 552fffa1-9df7-41d9-acca-5fef29a83830
 *                         productName:
 *                           type: string
 *                           example: Pears
 *                         description:
 *                           type: string
 *                           example: product description
 *                         cost:
 *                           type: number
 *                           example: 400
 *                         viewCount:
 *                           type: number
 *                           example: 2
 *               message:
 *                 type: string
 *                 example: products fetched successfully
 *       400:
 *         description: bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: permission denied
 *       5XX:
 *         description: Unexpected error
 */

productControllerRouter.get(
  '/',
  async function (req, res) {
    let queryParams = req.query;
    const ts = new ProductService();
    let products = await ts.getProducts(queryParams);
    res.status(statusCodes.SUCESSS).json(
      new ResponseMessage(sucessMessages.productFetched, {
        products: products,
      })
    );
  }
);

/**
 * @swagger
 *
 * /api/v1/product/{productId}:
 *   delete:
 *     description: delete a product
 *     produces:
 *       - application/json
 *     tags:
 *       - product
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: productid of the product to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: 552fffa1-9df7-41d9-acca-5fef29a83830
 *     responses:
 *       200:
 *         description: delete product response
 *         schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *               message:
 *                 type: string
 *                 example: product deleted successfully
 *       400:
 *         description: bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: permission denied
 *       5XX:
 *         description: Unexpected error
 */

productControllerRouter.delete(
  '/:productid',
  async function (req, res) {
    const ts = new ProductService();
    let productId = req.params['productid'];
    if (!validate(productId)) {
      throw new BusinessError(
        statusCodes.BADREQUEST,
        'productId must be a valid guid'
      );
    }
    await ts.deleteProduct(productId);
    res
      .status(statusCodes.SUCESSS)
      .json(new ResponseMessage(sucessMessages.productDeleted, {}));
  }
);
