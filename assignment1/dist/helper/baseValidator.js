"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseValidator = void 0;
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const error_1 = require("../middleware/error");
/**
 *  Class has methods to validate all the decorators attached to properties of a model
 * and returns an array of error strings consumable by the UI
 *  All models that intend to use decorator style validations should inherit BaseValidator class
 */
class BaseValidator {
    constructor() {
        /**
         * Validates the instance object for all the decorator attributes and returns formmatted error string array conatining uniqueErrors
         */
        this.validate = () => {
            return class_validator_1.validate(this).then((validationErrors) => {
                if (lodash_1.isEmpty(validationErrors)) {
                    return Promise.resolve();
                }
                else {
                    const formattedValidationErrors = lodash_1.uniq(this.errorFormatter(validationErrors));
                    return Promise.reject(new error_1.BusinessError(400, formattedValidationErrors.join()));
                }
            });
            // tslint:disable-next-line: semicolon
        };
        /**
         * Formats validation errors array into an array of error messages
         * @param validationErrors : Array of validation errors generated post validation of a model
         */
        this.errorFormatter = (validationErrors) => {
            return validationErrors
                .map((validationError) => {
                return validationError.constraints;
            })
                .map((error) => {
                return Object.keys(error).map((e) => error[e]);
            })
                .reduce((flat, toflatten) => {
                return flat.concat(toflatten);
            }, []);
            // tslint:disable-next-line: semicolon
        };
    }
}
exports.BaseValidator = BaseValidator;
//# sourceMappingURL=baseValidator.js.map