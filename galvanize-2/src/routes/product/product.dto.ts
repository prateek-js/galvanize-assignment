import {
  IsDefined,
  MaxLength,
  IsOptional,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { BaseValidator } from '../../helper/baseValidator';
import { errorMessages } from '../../helper/constants';

// tslint:disable-next-line: interface-name
export class ProductDto extends BaseValidator {

  @IsNotEmpty({ message: errorMessages.productNameParameterMissing })
  @MaxLength(1000, { message: errorMessages.productNameMaxLengthExceded })
  productName: string;

  @IsOptional()
  @MaxLength(4000, { message: errorMessages.descriptionMaxLengthExceded })
  description: string;

  @IsNotEmpty({ message: errorMessages.costParameterMissing })
  cost: number;

  @IsOptional()
  viewCount: number;

  /**
   *
   */
  constructor(
    productName: string,
    description: string,
    cost: number,
    viewCount: number
  ) {
    super();
    this.productName = productName;
    this.description = description;
    this.cost = cost;
    this.viewCount = viewCount
  }
}
