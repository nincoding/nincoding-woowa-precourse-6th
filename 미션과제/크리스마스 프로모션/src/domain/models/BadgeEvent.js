import { EMPTY_VALUE, USER_BADGE } from '../../constants/constant.js';
import { BADGE_PRIZE } from '../../constants/conditions.js';

class BadgeEvent {
  #Badge;

  constructor(totalSaleAmount) {
    this.#Badge = this.#calcBadge(totalSaleAmount);
  }

  getBadge() {
    return this.#Badge;
  }

  /**
   * 총 할인금액을 기준으로 사용자의 배지를 계산한다.
   * @param {number} totalSaleAmount - 총 할인금액
   * @returns {string} badge - 사용자의 이벤트배지
   */
  #calcBadge(totalSaleAmount) {
    if (totalSaleAmount >= BADGE_PRIZE.santa) return USER_BADGE.santa;
    if (totalSaleAmount >= BADGE_PRIZE.tree) return USER_BADGE.tree;
    if (totalSaleAmount >= BADGE_PRIZE.star) return USER_BADGE.star;

    return EMPTY_VALUE;
  }
}

export default BadgeEvent;
