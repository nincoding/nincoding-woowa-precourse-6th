import { EMPTY_COUNT } from '../../constants/constant.js';
import { EVENT_PLANNER, SALE_PRIZE } from '../../constants/conditions.js';

class ChristmasDdayEvent {
  #christmasDdaySalePrice;

  constructor(visitDate) {
    this.#christmasDdaySalePrice = this.#countDdaySale(visitDate);
  }

  getChristmasDdaySalePrice() {
    return this.#christmasDdaySalePrice;
  }

  /**
   * 이벤트 시작일부터 방문날짜까지 1일씩 할인금액을 증가시킨다.
   * @param {number} visitDate - 방문날짜
   * @returns {number} christmasDdaySalePrice - 크리스마스 이벤트 할인 금액
   */
  #countDdaySale(visitDate) {
    if (visitDate <= EVENT_PLANNER.christmas) {
      return (
        SALE_PRIZE.startBasePrice +
        SALE_PRIZE.additionalPricePerDay * (visitDate - EVENT_PLANNER.startDate)
      );
    }

    return EMPTY_COUNT;
  }
}

export default ChristmasDdayEvent;
