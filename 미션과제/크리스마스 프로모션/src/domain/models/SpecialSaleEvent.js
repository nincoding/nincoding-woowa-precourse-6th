import { EMPTY_COUNT } from '../../constants/constant.js';
import { EVENT_PLANNER, SALE_PRIZE } from '../../constants/conditions.js';

class SpecialSaleEvent {
  #specialSalePrice;

  constructor(visitDate) {
    this.#specialSalePrice = this.#checkIncludeEventDate(visitDate);
  }

  getSpecialSalePrice() {
    return this.#specialSalePrice;
  }

  /**
   * 방문날짜가 특별할인날짜와 일치하는지 확인하여 할인금액을 계산한다.
   * @param {number} visitDate - 방문날짜
   * @returns {number} specialSalePrice - 특별할인금액
   */
  #checkIncludeEventDate(visitDate) {
    const specialDate = [...EVENT_PLANNER.specialDate];

    const isSpecialDate = specialDate.find((date) => date === visitDate);

    return isSpecialDate ? SALE_PRIZE.specialSale : EMPTY_COUNT;
  }
}

export default SpecialSaleEvent;
