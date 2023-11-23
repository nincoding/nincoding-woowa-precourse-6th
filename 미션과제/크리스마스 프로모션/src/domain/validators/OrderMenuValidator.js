import throwValidationError from '../../utils/throwValidationError.js';
import { isNumeric, isInteger } from '../../utils/numericValidation.js';
import { MENU, EMPTY_COUNT } from '../../constants/constant.js';
import { VALID_CONDITION } from '../../constants/conditions.js';
import { ERROR_MESSAGE } from '../../constants/errorMessage.js';

class OrderMenuValidator {
  static validate(orderMenu) {
    const menuNames = orderMenu.map((menu) => Object.keys(menu)[0]);
    const orderCounts = orderMenu.map((menu) => Object.values(menu)[0]);

    throwValidationError(!this.isContainAllMenu(menuNames), ERROR_MESSAGE.invalidOrder);
    throwValidationError(!this.isUniqeMenuName(menuNames), ERROR_MESSAGE.invalidOrder);
    throwValidationError(this.isOnlyDrinks(menuNames), ERROR_MESSAGE.invalidOrder);
    throwValidationError(!this.isValidateOrderCount(orderCounts), ERROR_MESSAGE.invalidOrder);
    throwValidationError(!this.isValidTotalCount(orderCounts), ERROR_MESSAGE.invalidOrder);
  }

  /**
   * 주문한 메뉴들이 메뉴판에 모두 포함되어 있는지 검증한다.
   * @param {Array} menuNames - 주문한 메뉴들의 이름배열
   * @returns {boolean} - 모두 포함되어 있으면 true를 반환한다.
   */
  static isContainAllMenu(menuNames) {
    return menuNames.every((menuName) => this.isContainCategory(menuName));
  }

  static isContainCategory(menuName) {
    return Object.values(MENU).some((menuSet) => menuSet.has(menuName));
  }

  // 주문한 메뉴들에 중복되는 메뉴가 있는지 검증한다.
  static isUniqeMenuName(menuNames) {
    const uniqueMenuNames = new Set(menuNames);

    return uniqueMenuNames.size === menuNames.length;
  }

  // 주문한 메뉴들이 모두 음료인지 확인한다.
  static isOnlyDrinks(menuNames) {
    return menuNames.every((menuName) => MENU.drink.has(menuName));
  }

  /**
   * 주문할 수 있는 개수의 모든 유효성을 검증한다.
   * @param {Array} orderCounts - 주문한 개수들의 숫자배열
   * @returns {boolean} 모두 범위에 유효한 숫자인 경우 true를 반환한다.
   */
  static isValidateOrderCount(orderCounts) {
    return orderCounts.every((count) => {
      return this.isValidRange(count) && isNumeric(count) && isInteger(count);
    });
  }

  // 주문 개수의 범위를 검증한다.
  static isValidRange(count) {
    return count >= VALID_CONDITION.minOrder && count <= VALID_CONDITION.maxOrder;
  }

  // 주문 개수의 총합 수량이 최대 범위를 넘지 않는지 검증한다.
  static isValidTotalCount(orderCounts) {
    const totalMenuCount = orderCounts.reduce((acc, count) => acc + count, EMPTY_COUNT);

    return totalMenuCount <= VALID_CONDITION.maxOrder;
  }
}

export default OrderMenuValidator;
