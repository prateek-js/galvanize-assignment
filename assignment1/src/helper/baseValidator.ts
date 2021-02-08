import { validate, ValidationError } from 'class-validator';
import { isEmpty, uniq } from 'lodash';
import { BusinessError } from '../middleware/error';

/**
 *  Class has methods to validate all the decorators attached to properties of a model
 * and returns an array of error strings consumable by the UI
 *  All models that intend to use decorator style validations should inherit BaseValidator class
 */
export class BaseValidator {
  /**
   * Validates the instance object for all the decorator attributes and returns formmatted error string array conatining uniqueErrors
   */
  validate = (): Promise<void> => {
    return validate(this).then((validationErrors) => {
      if (isEmpty(validationErrors)) {
        return Promise.resolve();
      } else {
        const formattedValidationErrors = uniq(
          this.errorFormatter(validationErrors)
        );
        return Promise.reject(
          new BusinessError(400, formattedValidationErrors.join())
        );
      }
    });
    // tslint:disable-next-line: semicolon
  };

  /**
   * Formats validation errors array into an array of error messages
   * @param validationErrors : Array of validation errors generated post validation of a model
   */
  errorFormatter = (validationErrors: ValidationError[]): Array<string> => {
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
