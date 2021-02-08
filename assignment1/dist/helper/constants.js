"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCodes = exports.sucessMessages = exports.errorMessages = void 0;
exports.errorMessages = {
    productNameParameterMissing: 'missing parameter productName',
    productNameMaxLengthExceded: 'productName must be shorter than or equal to 1000 characters',
    descriptionMaxLengthExceded: 'description must be shorter than or equal to 4000 characters',
    costMaxLengthExceded: 'cost must be shorter than or equal to 10 characters',
    costParameterMissing: 'missing parameter cost',
    invalidProductName: 'A product with given name does not exist',
    genericErrorMessage: 'An unexpected error occured, kindly contact the administrator',
};
exports.sucessMessages = {
    productAdded: 'product added sucessfully',
    productUpdated: 'product updated sucessfully',
    productFetched: 'product fetched sucessfully',
    productDeleted: 'product deleted sucessfully',
};
exports.statusCodes = {
    BADREQUEST: 400,
    SUCESSS: 200,
    INTERNALSERVERERROR: 500,
};
//# sourceMappingURL=constants.js.map