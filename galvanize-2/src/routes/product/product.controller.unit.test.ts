import { BusinessError } from '../../middleware/error';
import { ProductDto } from './product.dto';

describe('product dto input validator', () => {
  let productDto: ProductDto;

  beforeEach(() => {
    productDto = new ProductDto(
      'product1',
      'some description',
      200,
      0
    );
  });

  const exec = async () => {
    try {
      await productDto.validate();
    } catch (error) {
      return error;
    }
  };

  it('should throw validation error if productName is undefined', async () => {
    delete productDto.productName;
    let error = await exec();
    expect(error).toBeInstanceOf(BusinessError);
  });
  it('should throw validation error if productName is blank', async () => {
    productDto.productName = '';
    let error = await exec();
    expect(error).toBeInstanceOf(BusinessError);
  });
  it('should throw validation error if productName is null', async () => {
    productDto.productName = null;
    let error = await exec();
    expect(error).toBeInstanceOf(BusinessError);
  });
  it('should throw validation error if productName is greater than 1000 characters', async () => {
    productDto.productName = new Array(1010).join('a');
    let error = await exec();
    expect(error).toBeInstanceOf(BusinessError);
  });

  it('should not throw validation error if description is undefined', async () => {
    delete productDto.description;
    let error = await exec();
    expect(error).toBeUndefined();
  });
  it('should not throw validation error if description is blank', async () => {
    productDto.description = '';
    let error = await exec();
    expect(error).toBeUndefined();
  });
  it('should throw validation error if description is null', async () => {
    productDto.description = null;
    let error = await exec();
    expect(error).toBeUndefined();
  });
  it('should throw validation error if description is greater than 1000 characters', async () => {
    productDto.description = new Array(4010).join('a');
    let error = await exec();
    expect(error).toBeInstanceOf(BusinessError);
  });

  it('should throw validation error if cost is undefined', async () => {
    delete productDto.cost;
    let error = await exec();
    expect(error).toBeInstanceOf(BusinessError);
  });
  it('should throw validation error if cost is blank', async () => {
    productDto.cost = null;
    let error = await exec();
    expect(error).toBeInstanceOf(BusinessError);
  });
  it('should throw validation error if cost is null', async () => {
    productDto.cost = null;
    let error = await exec();
    expect(error).toBeInstanceOf(BusinessError);
  });
});
