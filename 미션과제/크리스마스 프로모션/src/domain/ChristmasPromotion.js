import * as EventModels from './models/index.js';
import { EVENT_CONDITION } from '../constants/conditions.js';
import {
  MENU_PRIZE,
  INITIAL_SALE_INFO,
  PROMOTION_KEY,
  EMPTY_COUNT,
} from '../constants/constant.js';

class ChristmasPromotion {
  #totalOrderAmount;
  #totalSaleInfo;
  #totalSaleAmount;
  #champagneEvent;

  /**
   * 총 주문금액을 반환한다.
   * @param {Array<{ menuName: number }>} orderMenu - 주문메뉴
   * @returns {number} totalOrderAmount - 총 주문금액
   */
  getTotalOrderAmount(orderMenu) {
    this.#totalOrderAmount = this.#calcTotalOrderAmount(orderMenu);

    return this.#totalOrderAmount;
  }

  /**
   * 증정샴페인의 개수를 반환한다.
   * @returns {number} presentedChampagne - 증정 샴페인의 개수
   */
  getPresentedChampagne() {
    this.#champagneEvent = new EventModels.ChampagneEvent(this.#totalOrderAmount);

    return this.#champagneEvent.getChampagne();
  }

  /**
   * 적용된 혜택 내역을 반환한다.
   * @param {number} visitDate
   * @param {Array<{ menuName: number }>} orderMenu
   * @returns {Object} totalSaleInfo - { promotion: amount } 적용된 이벤트명과 할인금액을 가진 객체
   */
  getTotalSaleInfo(visitDate, orderMenu) {
    this.#totalSaleInfo = this.#isEventCondition()
      ? this.#calcTotalSaleInfo(visitDate, orderMenu)
      : INITIAL_SALE_INFO;

    return this.#totalSaleInfo;
  }

  /**
   * 적용된 혜택내역의 할인금액들을 모두 더해서 반환한다.
   * @returns {number} totalSaleAmount - 총 할인금액
   */
  getTotalSaleAmount() {
    const saleAmounts = Object.values(this.#totalSaleInfo);

    this.#totalSaleAmount = this.#isEventCondition()
      ? saleAmounts.reduce((total, amount) => total + amount, EMPTY_COUNT)
      : EMPTY_COUNT;

    return this.#totalSaleAmount;
  }

  /**
   * 총 주문금액과 총 할인금액을 뺀, 예상금액을 계산한다. 이때, 할인금액에서 증정샴페인의 가격은 제외한다.
   * @returns {number} estimatedAmount - 할인 후 예상금액
   */
  getEstimatedAmount() {
    return (
      this.#totalOrderAmount - this.#totalSaleAmount + this.#totalSaleInfo[PROMOTION_KEY.champagne]
    );
  }

  /**
   * 총 할인된 금액으로 사용자의 이벤트 배지를 반환한다.
   * @returns {string} badge - 사용자의 이벤트 배지
   */
  getBadge() {
    return new EventModels.BadgeEvent(this.#totalSaleAmount).getBadge();
  }

  // 혜택 이벤트의 적용 조건
  #isEventCondition() {
    return this.#totalOrderAmount >= EVENT_CONDITION.moreOrderAmount;
  }

  /**
   * 주문메뉴의 가격대로 주문한 개수만큼 곱해서 전체 주문가격을 계산한다.
   * @param {Array<{ menuName: number }>} orderMenu
   * @returns {number} totalOrderAmount - 총 주문금액
   */
  #calcTotalOrderAmount(orderMenu) {
    return orderMenu
      .flatMap((order) => Object.entries(order))
      .map(([menuName, orderCount]) => MENU_PRIZE[menuName] * orderCount)
      .reduce((total, amount) => total + amount, EMPTY_COUNT);
  }

  /**
   * 각 이벤트 모델들의 인스턴스를 생성하여, 적용된 이벤트명과 할인금액을 객체로 생성한다.
   * @param {number} visitDate
   * @param {Array<{ menuName: number }>} orderMenu
   * @returns {Object} totalSaleInfo
   */
  #calcTotalSaleInfo(visitDate, orderMenu) {
    const christmasDday = new EventModels.ChristmasDdayEvent(visitDate);
    const dailyMenuDiscount = new EventModels.DailyMenuDiscountEvent(visitDate, orderMenu);
    const specialSale = new EventModels.SpecialSaleEvent(visitDate);
    const totalSaleInfo = { ...INITIAL_SALE_INFO };
    const visitDay = dailyMenuDiscount.getVisitDay();

    totalSaleInfo[PROMOTION_KEY.christmasDday] = christmasDday.getChristmasDdaySalePrice();
    totalSaleInfo[PROMOTION_KEY.visitDate(visitDay)] = dailyMenuDiscount.getDailySalePrice();
    totalSaleInfo[PROMOTION_KEY.special] = specialSale.getSpecialSalePrice();
    totalSaleInfo[PROMOTION_KEY.champagne] = this.#champagneEvent.getPresentedPrice();

    return totalSaleInfo;
  }
}

export default ChristmasPromotion;
