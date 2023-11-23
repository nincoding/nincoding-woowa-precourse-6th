import { Console } from '@woowacourse/mission-utils';
import addCommaAmount from '../utils/addCommaAmount.js';
import OUTPUT_MESSAGE from '../constants/outputMessage.js';
import { EMPTY_VALUE, EMPTY_COUNT } from '../constants/constant.js';

const OutputView = {
  printErrorMessage(message) {
    Console.print(message);
  },

  printStartService() {
    Console.print(OUTPUT_MESSAGE.startService);
  },

  /**
   * 미리보기 메세지를 방문날짜를 넣어서 출력한다.
   * @param {number} visitDate
   */
  printPreviewbenefits(visitDate) {
    Console.print(OUTPUT_MESSAGE.previewbenefits(visitDate));
  },

  /**
   * 모든 주문메뉴를 메뉴와 개수로 줄바꿔 출력한다.
   * @param {Array<{ menuName: number }>} orderMenu
   */
  printOrderMenuInfo(orderMenu) {
    Console.print(`\n${OUTPUT_MESSAGE.orderMenu}`);

    orderMenu.forEach((menu) => {
      const menuName = Object.keys(menu)[0];
      const count = menu[menuName];

      Console.print(OUTPUT_MESSAGE.formatOrderMenu(menuName, count));
    });
  },

  // 할인 전 총주문 금액을 출력한다.
  printTotalOrderAmount(totalOrderAmount) {
    const prefixMessage = this.printPrefixMessage(OUTPUT_MESSAGE.totalOrderAmount);

    this.printAmountMessage(prefixMessage, totalOrderAmount);
  },

  /**
   * 증정된 샴페인의 개수를 전달받아 출력한다.
   * @param {number} presentedChampagne
   */
  printPresentedMenu(presentedChampagne) {
    Console.print(`\n${OUTPUT_MESSAGE.presentedMenu}`);

    presentedChampagne > EMPTY_COUNT
      ? Console.print(OUTPUT_MESSAGE.formatPresent(presentedChampagne))
      : Console.print(EMPTY_VALUE);
  },

  /**
   * 각 혜택 내역과 할인된 금액을 전체적으로 출력한다.
   * @param {Object} totalSaleInfo - { promotion: amount }
   */
  printTotalSaleInfo(totalSaleInfo) {
    Console.print(`\n${OUTPUT_MESSAGE.promotions}`);

    if (Object.values(totalSaleInfo).every((amount) => amount === EMPTY_COUNT)) {
      return Console.print(EMPTY_VALUE);
    }

    Object.entries(totalSaleInfo).forEach(([promotion, amount]) => {
      const amountString = addCommaAmount(amount);

      if (amount !== EMPTY_COUNT) {
        Console.print(OUTPUT_MESSAGE.formatSaleInfo(promotion, amountString));
      }
    });
  },

  /**
   * 총혜택 금액을 출력한다.
   * @param {number} totalSaleAmount
   */
  printTotalSaleAmount(totalSaleAmount) {
    const prefixMessage = this.printPrefixMessage(OUTPUT_MESSAGE.totalSaleAmount);
    const amountString = addCommaAmount(totalSaleAmount);

    totalSaleAmount > EMPTY_COUNT
      ? Console.print(OUTPUT_MESSAGE.formatSaleAmount(prefixMessage, amountString))
      : this.printAmountMessage(prefixMessage, totalSaleAmount);
  },

  // 할인 후 예상 결제 금액을 출력한다.
  printEstimatedAmount(estimatedAmount) {
    const prefixMessage = this.printPrefixMessage(OUTPUT_MESSAGE.estimatedAmount);

    this.printAmountMessage(prefixMessage, estimatedAmount);
  },

  // 12월 이벤트 배지를 출력한다.
  printBadge(badge) {
    const prefixMessage = this.printPrefixMessage(OUTPUT_MESSAGE.eventBadge);

    Console.print(`${prefixMessage}${badge}`);
  },

  // 설명메세지와 원화 기준으로 금액을 함께 출력한다.
  printAmountMessage(prefixMessage, amount) {
    const amountString = addCommaAmount(amount);

    Console.print(OUTPUT_MESSAGE.formatPositiveAmount(prefixMessage, amountString));
  },

  // 앞 뒷줄에 개행을 추가한다.
  printPrefixMessage(prefixMessage) {
    return `\n${prefixMessage}\n`;
  },
};

export default OutputView;
