import { DAY, MENU, EMPTY_COUNT } from '../../constants/constant.js';
import { EVENT_PLANNER, SALE_PRIZE } from '../../constants/conditions.js';

class DailyMenuDiscountEvent {
  #visitDay;
  #dailySalePrice;

  constructor(visitDate, orderMenu) {
    this.#visitDay = this.#distinguishVisitDay(visitDate);
    this.#dailySalePrice = this.#dailyMenuDiscount(orderMenu);
  }

  getVisitDay() {
    return this.#visitDay;
  }

  getDailySalePrice() {
    return this.#dailySalePrice;
  }

  // 방문날짜가 주말인지, 평일인지 판별한다.
  #distinguishVisitDay(visitDate) {
    const visitWeekEnd = EVENT_PLANNER.weekends.includes(visitDate);

    return visitWeekEnd ? DAY.weekend : DAY.weekday;
  }

  // 주말일땐 메인요리를, 평일일땐 디저트를 주문메뉴와 함께 전달한다.
  #dailyMenuDiscount(orderMenu) {
    const menuCategory = this.#visitDay === DAY.weekend ? MENU.mainDish : MENU.dessert;

    return this.#calculateDiscount(orderMenu, menuCategory);
  }

  /**
   * 할인 적용되는 메뉴의 총 개수만큼 할인금액을 곱해서 반환한다.
   * @param {Array<{ menuName: number }>} orderMenu - 메뉴 이름과 주문 수량으로 이루어진 객체배열
   * @param {Set} menuCategory - 해당 카테고리에 포함되는 메뉴목록
   * @returns {number} - dailySalePrice 총 할인된 금액
   */
  #calculateDiscount(orderMenu, menuCategory) {
    if (this.#isContainMenu(orderMenu, menuCategory)) {
      const totalItemCount = this.#calculateTotalMenuCount(orderMenu, menuCategory);

      return totalItemCount * SALE_PRIZE.dailySale;
    }

    return EMPTY_COUNT;
  }

  /**
   * 주문메뉴가 할인 카테고리 메뉴목록에 포함하는지 확인한다.
   * @param {Array<{ menuName: number }>} orderMenu
   * @param {Set} menuCategory
   * @returns {boolean} 하나라도 포함되는지 여부를 반환한다.
   */
  #isContainMenu(orderMenu, menuCategory) {
    return orderMenu.some((order) => {
      const menuName = Object.keys(order)[0];

      return menuCategory.has(menuName);
    });
  }

  /**
   * 해당 할인메뉴 카테고리에 속하는 주문메뉴들의 총 수량을 계산한다.
   * @param {Array<{ menuName: number }>} orderMenu
   * @param {Set} menuCategory
   * @returns {number} totalCount - 포함하는 총 수량
   */
  #calculateTotalMenuCount(orderMenu, menuCategory) {
    return orderMenu.reduce((total, order) => {
      const menuName = Object.keys(order)[0];
      const orderCount = order[menuName];

      return menuCategory.has(menuName) ? total + orderCount : total;
    }, EMPTY_COUNT);
  }
}

export default DailyMenuDiscountEvent;
