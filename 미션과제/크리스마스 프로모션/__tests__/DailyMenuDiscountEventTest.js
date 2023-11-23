import DailyMenuDiscountEvent from '../src/domain/models/DailyMenuDiscountEvent.js';
import { DAY } from '../src/constants/constant.js';

describe('DailyMenuDiscountEvent', () => {
  let dailyMenuDiscountEvent;
  let resultVisitDay;
  let resultDailySalePrice;

  const createEvent = (visitDate, orderReceipt) => {
    dailyMenuDiscountEvent = new DailyMenuDiscountEvent(visitDate, orderReceipt);
    resultVisitDay = () => dailyMenuDiscountEvent.getVisitDay();
    resultDailySalePrice = () => dailyMenuDiscountEvent.getDailySalePrice();
  };

  const orderReceipt = [{ 티본스테이크: 2 }, { 초코케이크: 2 }, { 바비큐립: 1 }, { 양송이수프: 3 }];
  const emptyMainOrder = [{ 양송이수프: 1 }, { 아이스크림: 1 }];
  const emptyDessertOrder = [{ 양송이수프: 1 }, { 해산물파스타: 1 }];

  const weekdayTestCases = [
    [3, orderReceipt, DAY.weekday, 4_046],
    [25, orderReceipt, DAY.weekday, 4_046],
    [13, emptyMainOrder, DAY.weekday, 2_023],
    [27, emptyDessertOrder, DAY.weekday, 0],
  ];

  const weekendTestCases = [
    [1, orderReceipt, DAY.weekend, 6_069],
    [30, orderReceipt, DAY.weekend, 6_069],
    [29, emptyMainOrder, DAY.weekend, 0],
    [23, emptyDessertOrder, DAY.weekend, 2_023],
  ];

  test.each(weekdayTestCases)(
    '방문날짜가 평일인 경우 평일이 반환되는지 테스트한다.',
    (visitDate, orderReceipt, expectedDay) => {
      createEvent(visitDate, orderReceipt);

      expect(resultVisitDay()).toBe(expectedDay);
    }
  );

  test.each(weekendTestCases)(
    '방문날짜가 주말인 경우 주말이 반환되는지 테스트한다.',
    (visitDate, orderReceipt, expectedDay) => {
      createEvent(visitDate, orderReceipt);

      expect(resultVisitDay()).toBe(expectedDay);
    }
  );

  test.each(weekendTestCases)(
    '방문날짜가 주말인 경우 메인메뉴가 할인된 금액이 알맞게 반환되는지 테스트한다.',
    (visitDate, orderReceipt, _, expectedSalePrice) => {
      createEvent(visitDate, orderReceipt);

      expect(resultDailySalePrice()).toBe(expectedSalePrice);
    }
  );

  test.each(weekdayTestCases)(
    '방문날짜가 평일인 경우 디저트메뉴가 할인된 금액이 알맞게 반환되는지 테스트한다.',
    (visitDate, orderReceipt, _, expectedSalePrice) => {
      createEvent(visitDate, orderReceipt);

      expect(resultDailySalePrice()).toBe(expectedSalePrice);
    }
  );
});
