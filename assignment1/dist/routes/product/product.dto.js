"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDto = void 0;
const class_validator_1 = require("class-validator");
const baseValidator_1 = require("../../helper/baseValidator");
const constants_1 = require("../../helper/constants");
// tslint:disable-next-line: interface-name
class ProductDto extends baseValidator_1.BaseValidator {
    /**
     *
     */
    constructor(productName, description, cost, viewCount) {
        super();
        this.productName = productName;
        this.description = description;
        this.cost = cost;
        this.viewCount = viewCount;
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: constants_1.errorMessages.productNameParameterMissing }),
    class_validator_1.MaxLength(1000, { message: constants_1.errorMessages.productNameMaxLengthExceded }),
    __metadata("design:type", String)
], ProductDto.prototype, "productName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.MaxLength(4000, { message: constants_1.errorMessages.descriptionMaxLengthExceded }),
    __metadata("design:type", String)
], ProductDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: constants_1.errorMessages.costParameterMissing }),
    class_validator_1.MaxLength(100, {
        message: constants_1.errorMessages.costMaxLengthExceded,
    }),
    __metadata("design:type", String)
], ProductDto.prototype, "cost", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], ProductDto.prototype, "viewCount", void 0);
exports.ProductDto = ProductDto;
//# sourceMappingURL=product.dto.js.map