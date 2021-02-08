import { ProductDto } from './product.dto';
import { v4 as uuidv4, validate } from 'uuid';
import * as express from 'express';
export const productControllerRouter = express.Router();
import { Product } from './product.entity';
import { BusinessError } from '../../middleware/error';
import * as typeorm from 'typeorm';
import { getConnection, Not } from 'typeorm';

import { constants } from './product.constants';
import { statusCodes } from '../../helper/constants';

export class ProductService {
  connection: typeorm.Connection;
  constructor() {
    this.connection = getConnection();
  }

  constructproductDto(productDtoInput: ProductDto): ProductDto {
    let productDto = new ProductDto(
      productDtoInput.productName,
      productDtoInput.description,
      productDtoInput.cost,
      0
    );
    return productDto;
  }

  async validateProductExists(
    productName: string
  ): Promise<void> {
    const productRepository = this.connection.getRepository(Product);
    let productCount = await productRepository.count({
      productName: productName,
    });

    if (productCount !== 0) {
      throw new BusinessError(
        statusCodes.BADREQUEST,
        constants.productNameExists
      );
    }
  }

  async createProduct(
    productDto: ProductDto
  ): Promise<void> {
    const productRepository = this.connection.getRepository(Product);
    //if productname already exists then throw duplicate product exception
    const productCount = await productRepository.count({
      where: [
        { productName: productDto.productName },
      ],
    });

    if (productCount !== 0) {
      throw new BusinessError(
        statusCodes.BADREQUEST,
        constants.productAlreadyExists
      );
    }

    const p = new Product();
    p.createdDate = new Date(new Date().toUTCString());
    p.updatedDate = new Date(new Date().toUTCString());
    p.productId =  uuidv4();
    p.productName = productDto.productName;
    p.description = productDto.description;
    p.cost= productDto.cost;
    p.viewCount = 0;
    p.isActive = true;
    await productRepository.save(p);
  }

  async getProduct(productId: string): Promise<Product> {
    if (!validate(productId)) {
      throw new BusinessError(
        statusCodes.BADREQUEST,
        'product id must be a valid guid'
      );
    }

    const productRepository = this.connection.getRepository(Product);
    let product = await productRepository.findOne({
      select: [
        'productId',
        'productName',
        'description',
        'cost',
        'viewCount'
      ],
      where: { productId: productId, isActive: true},
    });

    if (!product) {
      throw new BusinessError(
        statusCodes.BADREQUEST,
        constants.invalidproductId
      );
    }
    product.viewCount += 1;
    await productRepository.save(product);
    return product;
  }

  async getProducts(): Promise<Product[]> {
    const productRepository = this.connection.getRepository(Product);
    let products = await productRepository.find({
      select: [
        'productId',
        'productName',
        'description',
        'cost',
        'viewCount'
      ],
      where: {isActive : true},
      order: {
        viewCount: 'ASC',
      },
    });
    return products;
  }

  async deleteProduct(productId: string): Promise<void> {
    const productRepository = this.connection.getRepository(Product);
    let product = await productRepository.findOne({
      productId: productId,
    });
    if (!product) {
      throw new BusinessError(
        statusCodes.BADREQUEST,
        constants.invalidproductId
      );
    }
    product.updatedDate = new Date(new Date().toUTCString());
    product.isActive = false;
    await productRepository.save(product);
  }
}
