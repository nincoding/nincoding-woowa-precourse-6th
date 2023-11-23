import { PREFIX_ERROR } from '../constants/errorMessage.js';

class FommatError extends Error {
  constructor(message) {
    super(`${PREFIX_ERROR} ${message}`);
  }
}

export default FommatError;
