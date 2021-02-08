"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllerRouter = void 0;
const express = require("express");
exports.productControllerRouter = express.Router();
const product_service_1 = require("./product.service");
const responseMessage_1 = require("../../helper/responseMessage");
const constants_1 = require("../../helper/constants");
const uuid_1 = require("uuid");
const error_1 = require("../../middleware/error");
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
 *               type: string
 *               example: 400USD
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
exports.productControllerRouter.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ps = new product_service_1.ProductService();
        let productDto = ps.constructproductDto(req.body);
        yield productDto.validate();
        yield ps.createProduct(productDto);
        res
            .status(constants_1.statusCodes.SUCESSS)
            .json(new responseMessage_1.ResponseMessage(constants_1.sucessMessages.productAdded, {}));
    });
});
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
 *                         type: string
 *                         example: 400USD
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
exports.productControllerRouter.get('/:productid', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ps = new product_service_1.ProductService();
        let productId = req.params['productid'];
        let product = yield ps.getProduct(productId);
        res.status(constants_1.statusCodes.SUCESSS).json(new responseMessage_1.ResponseMessage(constants_1.sucessMessages.productFetched, {
            product: product,
        }));
    });
});
/**
 * @swagger
 *
 * /api/v1/product:
 *   get:
 *     description: get all the products
 *     produces:
 *       - application/json
 *     tags:
 *       - product
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
 *                           type: string
 *                           example: 400USD
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
exports.productControllerRouter.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ts = new product_service_1.ProductService();
        let products = yield ts.getProducts();
        res.status(constants_1.statusCodes.SUCESSS).json(new responseMessage_1.ResponseMessage(constants_1.sucessMessages.productFetched, {
            products: products,
        }));
    });
});
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
exports.productControllerRouter.delete('/:productid', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ts = new product_service_1.ProductService();
        let productId = req.params['productid'];
        if (!uuid_1.validate(productId)) {
            throw new error_1.BusinessError(constants_1.statusCodes.BADREQUEST, 'productId must be a valid guid');
        }
        yield ts.deleteProduct(productId);
        res
            .status(constants_1.statusCodes.SUCESSS)
            .json(new responseMessage_1.ResponseMessage(constants_1.sucessMessages.productDeleted, {}));
    });
});
//# sourceMappingURL=product.controller.js.map