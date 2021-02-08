// import { array } from 'joi';
// import { BusinessError } from '../../middleware/error';
// import { ProductDto } from './product.dto';

// describe('product dto input validator', () => {
//   let productDto: ProductDto;

//   beforeEach(() => {
//     productDto = new ProductDto(
//       'b09c7fc0-8643-4307-ae6c-67e5f14bbf81',
//       'product1',
//       'some description',
//       'someemail1@bcg.com',
//       'someemail2@bcg.com',
//       'someemail3@bcg.com',
//       'someemail4@bcg.com',
//       '123455'
//     );
//   });

//   const exec = async () => {
//     try {
//       await productDto.validate();
//     } catch (error) {
//       return error;
//     }
//   };

//   it('should throw validation error if productid is not a valid uuid', async () => {
//     productDto.productId = 'someinvalid guid';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if productid is blank', async () => {
//     productDto.productId = '';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if productid is null', async () => {
//     productDto.productId = null;
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if productid is undefined', async () => {
//     delete productDto.productId;
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });

//   it('should throw validation error if productName is undefined', async () => {
//     delete productDto.name;
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if productName is blank', async () => {
//     productDto.name = '';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if productName is null', async () => {
//     productDto.name = null;
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if productName is greater than 1000 characters', async () => {
//     productDto.name = new Array(1010).join('a');
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });

//   it('should not throw validation error if description is undefined', async () => {
//     delete productDto.description;
//     let error = await exec();
//     expect(error).toBeUndefined();
//   });
//   it('should not throw validation error if description is blank', async () => {
//     productDto.description = '';
//     let error = await exec();
//     expect(error).toBeUndefined();
//   });
//   it('should throw validation error if description is null', async () => {
//     productDto.description = null;
//     let error = await exec();
//     expect(error).toBeUndefined();
//   });
//   it('should throw validation error if description is greater than 1000 characters', async () => {
//     productDto.description = new Array(4010).join('a');
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });

//   it('should throw validation error if primaryBusinessContactEmail is undefined', async () => {
//     delete productDto.primaryBusinessContactEmail;
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if primaryBusinessContactEmail is blank', async () => {
//     productDto.primaryBusinessContactEmail = '';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if primaryBusinessContactEmail is null', async () => {
//     productDto.primaryBusinessContactEmail = null;
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if primaryBusinessContactEmail is not a valid emaild', async () => {
//     productDto.primaryBusinessContactEmail = 'some invalid email';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });

//   it('should not throw validation error if secondaryBusinessContactEmail is undefined', async () => {
//     delete productDto.secondaryBusinessContactEmail;
//     let error = await exec();
//     expect(error).toBeUndefined();
//   });
//   it('should throw validation error if secondaryBusinessContactEmail is blank', async () => {
//     productDto.secondaryBusinessContactEmail = '';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should not throw validation error if secondaryBusinessContactEmail is null', async () => {
//     productDto.secondaryBusinessContactEmail = null;
//     let error = await exec();
//     expect(error).toBeUndefined();
//   });
//   it('should throw validation error if secondaryBusinessContactEmail is not a valid emaild', async () => {
//     productDto.secondaryBusinessContactEmail = 'some invalid email';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });

//   it('should throw validation error if primaryTechnicalContactEmail is undefined', async () => {
//     delete productDto.primaryTechnicalContactEmail;
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if primaryTechnicalContactEmail is blank', async () => {
//     productDto.primaryTechnicalContactEmail = '';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if primaryTechnicalContactEmail is null', async () => {
//     productDto.primaryTechnicalContactEmail = null;
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if primaryTechnicalContactEmail is not a valid emaild', async () => {
//     productDto.primaryTechnicalContactEmail = 'some invalid email';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });

//   it('should not throw validation error if secondaryTechnicalContactEmail is undefined', async () => {
//     delete productDto.secondaryTechnicalContactEmail;
//     let error = await exec();
//     expect(error).toBeUndefined();
//   });
//   it('should throw validation error if secondaryTechnicalContactEmail is blank', async () => {
//     productDto.secondaryTechnicalContactEmail = '';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should not throw validation error if secondaryTechnicalContactEmail is null', async () => {
//     productDto.secondaryTechnicalContactEmail = null;
//     let error = await exec();
//     expect(error).toBeUndefined();
//   });
//   it('should throw validation error if secondaryTechnicalContactEmail is not a valid emaild', async () => {
//     productDto.secondaryTechnicalContactEmail = 'some invalid email';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });

//   it('should throw validation error if costCenter is undefined', async () => {
//     delete productDto.costCenter;
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if costCenter is blank', async () => {
//     productDto.costCenter = '';
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if costCenter is null', async () => {
//     productDto.costCenter = null;
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
//   it('should throw validation error if costCenter is greater than 100 characters', async () => {
//     productDto.costCenter = new Array(110).join('a');
//     let error = await exec();
//     expect(error).toBeInstanceOf(BusinessError);
//   });
// });
