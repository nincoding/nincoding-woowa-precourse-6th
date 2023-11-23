import { EMPTY_COUNT } from '../../constants/constant.js';
import { EVENT_CONDITION, SALE_PRIZE } from '../../constants/conditions.js';

class ChampagneEvent {
  #champagneCount;
  #presentedPrice;

  constructor(totalOrderAmount) {
    this.#champagneCount = this.#countChampagne(totalOrderAmount);
    this.#presentedPrice = this.#calcPresentedPrice();
  }

  getChampagne() {
    return this.#champagneCount;
  }

  getPresentedPrice() {
    return this.#presentedPrice;
  }

  /**
   * 총 주문금액에서 증정조건금액을 나눈 만큼 증정샴페인의 개수를 계산한다.
   * @param {number} totalOrderAmount - 총 주문금액
   * @returns {number} champagneCount - 증정 샴페인의 개수
   */
  #countChampagne(totalOrderAmount) {
    const isEventCondition = totalOrderAmount >= EVENT_CONDITION.morePresentAmount;

    return isEventCondition
      ? Math.trunc(totalOrderAmount / EVENT_CONDITION.morePresentAmount)
      : EMPTY_COUNT;
  }

  /**
   * 증정된 샴페인의 개수와 샴페인의 원가를 곱해 증정 혜택금액을 계산한다.
   * @returns {number} presentedPrice - 증정된 샴페인의 총 가격
   */
  #calcPresentedPrice() {
    return this.#champagneCount * SALE_PRIZE.champagneSale;
  }
}

export default ChampagneEvent;
