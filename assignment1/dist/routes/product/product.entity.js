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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../entity/base.entity");
let Product = class Product extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn({ name: 'productid' }),
    __metadata("design:type", String)
], Product.prototype, "productId", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ name: 'productname' }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    typeorm_1.Column({ name: 'description' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: 'cost' }),
    __metadata("design:type", String)
], Product.prototype, "cost", void 0);
__decorate([
    typeorm_1.Column({ name: 'viewcount' }),
    __metadata("design:type", Number)
], Product.prototype, "viewCount", void 0);
Product = __decorate([
    typeorm_1.Entity('product')
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map