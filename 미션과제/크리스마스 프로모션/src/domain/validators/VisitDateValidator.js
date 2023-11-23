import throwValidationError from '../../utils/throwValidationError.js';
import { isNumeric, isInteger } from '../../utils/numericValidation.js';
import { ERROR_MESSAGE } from '../../constants/errorMessage.js';
import { EVENT_PLANNER } from '../../constants/conditions.js';

class VisitDateValidator {
  static validate(visitDate) {
    throwValidationError(!this.isValidRange(visitDate), ERROR_MESSAGE.invalidDate);
    throwValidationError(!isNumeric(visitDate), ERROR_MESSAGE.invalidDate);
    throwValidationError(!isInteger(visitDate), ERROR_MESSAGE.invalidDate);
  }

  /**
   * 방문날짜의 유효한 범위를 검증한다.
   * @param {number} visitDate
   * @returns {boolean} 방문날짜가 범위에 유효한 숫자인 경우 true를 반환한다.
   */
  static isValidRange(visitDate) {
    return visitDate >= EVENT_PLANNER.startDate && visitDate <= EVENT_PLANNER.endDate;
  }
}

export default VisitDateValidator;
