import FormatError from './FormatError.js';

const throwValidationError = (condition, errorMessage) => {
  if (condition) {
    throw new FormatError(errorMessage);
  }
};

export default throwValidationError;
