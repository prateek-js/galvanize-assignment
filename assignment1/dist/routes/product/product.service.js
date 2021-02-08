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
exports.ProductService = exports.productControllerRouter = void 0;
const product_dto_1 = require("./product.dto");
const uuid_1 = require("uuid");
const express = require("express");
exports.productControllerRouter = express.Router();
const product_entity_1 = require("./product.entity");
const error_1 = require("../../middleware/error");
const typeorm_1 = require("typeorm");
const product_constants_1 = require("./product.constants");
const constants_1 = require("../../helper/constants");
class ProductService {
    constructor() {
        this.connection = typeorm_1.getConnection();
    }
    constructproductDto(productDtoInput) {
        let productDto = new product_dto_1.ProductDto(productDtoInput.productName, productDtoInput.description, productDtoInput.cost, 0);
        return productDto;
    }
    validateProductExists(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = this.connection.getRepository(product_entity_1.Product);
            let productCount = yield productRepository.count({
                productName: productName,
            });
            if (productCount !== 0) {
                throw new error_1.BusinessError(constants_1.statusCodes.BADREQUEST, product_constants_1.constants.productNameExists);
            }
        });
    }
    createProduct(productDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = this.connection.getRepository(product_entity_1.Product);
            //if productname already exists then throw duplicate product exception
            const productCount = yield productRepository.count({
                where: [
                    { productName: productDto.productName },
                ],
            });
            if (productCount !== 0) {
                throw new error_1.BusinessError(constants_1.statusCodes.BADREQUEST, product_constants_1.constants.productAlreadyExists);
            }
            const p = new product_entity_1.Product();
            p.createdDate = new Date(new Date().toUTCString());
            p.updatedDate = new Date(new Date().toUTCString());
            p.productId = uuid_1.v4();
            p.productName = productDto.productName;
            p.description = productDto.description;
            p.cost = productDto.cost;
            p.viewCount = 0;
            p.isActive = true;
            yield productRepository.save(p);
        });
    }
    getProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uuid_1.validate(productId)) {
                throw new error_1.BusinessError(constants_1.statusCodes.BADREQUEST, 'product id must be a valid guid');
            }
            const productRepository = this.connection.getRepository(product_entity_1.Product);
            let product = yield productRepository.findOne({
                select: [
                    'productId',
                    'productName',
                    'description',
                    'cost',
                    'viewCount'
                ],
                where: { productId: productId, isActive: true },
            });
            if (!product) {
                throw new error_1.BusinessError(constants_1.statusCodes.BADREQUEST, product_constants_1.constants.invalidproductId);
            }
            product.viewCount += 1;
            yield productRepository.save(product);
            return product;
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = this.connection.getRepository(product_entity_1.Product);
            let products = yield productRepository.find({
                select: [
                    'productId',
                    'productName',
                    'description',
                    'cost',
                    'viewCount'
                ],
                where: { isActive: true },
                order: {
                    viewCount: 'ASC',
                },
            });
            return products;
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = this.connection.getRepository(product_entity_1.Product);
            let product = yield productRepository.findOne({
                productId: productId,
            });
            if (!product) {
                throw new error_1.BusinessError(constants_1.statusCodes.BADREQUEST, product_constants_1.constants.invalidproductId);
            }
            product.updatedDate = new Date(new Date().toUTCString());
            product.isActive = false;
            yield productRepository.save(product);
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map