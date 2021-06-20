import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {

    @IsNotEmpty()
    @ApiProperty()
    productname: string;

    @ApiPropertyOptional()
    description: string;

    @IsNotEmpty()
    @ApiProperty()
    cost: string;

    @ApiPropertyOptional()
    viewCount: string;
}

export class ProductDto {

    @ApiResponseProperty()
    productname: string;

    @ApiResponseProperty()
    description: string;

    @ApiResponseProperty()
    cost: string;

    @ApiPropertyOptional()
    viewCount: string;

}
