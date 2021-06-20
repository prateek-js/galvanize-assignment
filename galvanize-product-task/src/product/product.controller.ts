import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private serv: ProductService) { }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }
}