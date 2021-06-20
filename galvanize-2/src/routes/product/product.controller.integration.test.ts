require('dotenv').config();
import * as typeorm from 'typeorm';
import { Product } from './product.entity';
import axios from 'axios';

const request = require('supertest');
const app = require('../../app');
const config = require('config');

let testConstants = require('../../test/constant');
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

let dbConnection: typeorm.Connection;
let productRepository: typeorm.Repository<Product>;

describe('POST Create product api', () => {
    let requestJson: any;
    const exec = async () => {
      var postRequest = request(app).post('/api/v1/product').send(requestJson);
      return await postRequest;
    };
  
    beforeAll(async () => {
      console.log('beforeall');
      dbConnection = await require('..//..//startup/db')();
      productRepository = dbConnection.getRepository(Product);
    }, 30000);
  
    afterAll(async () => {
      console.log('afterall');
      dbConnection.close();
    }, 30000);
  
    beforeEach(() => {
      console.log('before each');
      requestJson = {
        productName: 'Integration Test Product',
        description: 'product description',
        cost: 300,
      };
    });

    afterEach(async () => {
      console.log('after each');
      jest.resetAllMocks();
    });

    it('it should return 200 if product doesnot exists', async () => {
      const response = await exec();
      expect(response.statusCode).toBe(200);
    });
    it('it should return 400 if product already exists', async () => {
        const response = await exec();
        requestJson.productName = 'Integration Test Product';
        const responseUpdate = await exec();
        expect(responseUpdate.statusCode).toBe(400);
    });
  });

describe('Get a product api', () => {
    let product: any = null;
  const exec = async (productId: string) => {
    var getRequest = request(app).get('/api/v1/product/' + productId);
    return await getRequest;
  };

  beforeAll(async () => {
    console.log('beforeall');
    dbConnection = await require('..//..//startup/db')();
    productRepository = dbConnection.getRepository(Product);
  }, 30000);

  afterAll(async () => {
    console.log('afterall');
    dbConnection.close();
  }, 30000);

  beforeEach(async () => {
    console.log('before each');
    product = await productRepository.findOne({
        productName: 'Integration Test Product',
        description: 'product description',
        cost: 300,
        isActive: true,
    });
  });
  afterEach(async () => {
    console.log('after each');
    jest.resetAllMocks();
  });
  it('it should return 400 if productid is not valid guid', async () => {
    const response = await exec('not a guid');
    expect(response.statusCode).toBe(400);
  });
  it('it should return 400 if productid doesnot exist', async () => {
    const response = await exec(testConstants.randomGuid);
    expect(response.statusCode).toBe(400);
  });
  it('it should return 200 if productid exists', async () => {
    const response = await exec(product.productId);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.product.productId).toEqual(
        product.productId
    );
  });
});

describe('Get list of products api', () => {
  const exec = async () => {
    var getRequest = request(app).get('/api/v1/product');
    return await getRequest;
  };

  beforeAll(async () => {
    console.log('beforeall');
    dbConnection = await require('..//..//startup/db')();
    productRepository = dbConnection.getRepository(Product);
  }, 30000);

  afterAll(async () => {
    console.log('afterall');
    dbConnection.close();
  }, 30000);

  beforeEach(() => {
    console.log('before each');
  });
  afterEach(async () => {
    console.log('after each');
    jest.resetAllMocks();
  });

  it('it should return only active products', async () => {
    const response = await exec();
    let resultProducts = await productRepository.find({ isActive: true });
    let activeCount = resultProducts.filter((function (e) {
        return e.viewCount >= 1 ;
      })
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.data.products).toHaveLength(activeCount.length);
  });
});

describe('Delete product api', () => {
    let product: any = null;
  const exec = async (productId: string) => {
    var getRequest = request(app).delete('/api/v1/product/' + productId);
    return await getRequest;
  };

  beforeAll(async () => {
    console.log('beforeall');
    dbConnection = await require('..//..//startup/db')();
    productRepository = dbConnection.getRepository(Product);
  }, 30000);

  afterAll(async () => {
    console.log('afterall');
    if (product) {
        product.isActive = false;
        await productRepository.delete({productId: product.productId});
    }
    dbConnection.close();
  }, 30000);

  beforeEach(async () => {
    console.log('before each');
    product = await productRepository.findOne({
        productName: 'Integration Test Product',
        description: 'product description',
        cost: 300,
        isActive: true,
    });
  });
  afterEach(async () => {
    console.log('after each')
    jest.resetAllMocks();
  });

  it('it should return 400 if productId is not a valid guid', async () => {
    const response = await exec('not a guid productid');
    expect(response.statusCode).toBe(400);
  });

  it('it should return 400 if productId doesnot exist', async () => {
    const response = await exec(testConstants.randomGuid);
    expect(response.statusCode).toBe(400);
  });

  it('it should return 200 and delete the product if the productid exist', async () => {
    product.isActive = false;
    await productRepository.save(product);
    const response = await exec(product.productId);
    expect(response.statusCode).toBe(200);
    expect((await product).isActive).toEqual(false);
    //reset the product to active again
    product.isActive = true;
    await productRepository.save(product);
  });
});
