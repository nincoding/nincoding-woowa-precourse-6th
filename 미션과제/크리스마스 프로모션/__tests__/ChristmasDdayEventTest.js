import ChristmasDdayEvent from '../src/domain/models/ChristmasDdayEvent.js';

describe('ChristmasDdayEvent', () => {
  let christmasDdayEvent;
  let resultSalePrice;

  const setChristmasDdayEvent = (visitDate) => {
    christmasDdayEvent = new ChristmasDdayEvent(visitDate);
    resultSalePrice = () => christmasDdayEvent.getChristmasDdaySalePrice();
  };

  const eventTestCases = [
    [1, 1_000],
    [3, 1_200],
    [10, 1_900],
    [25, 3_400],
  ];

  const pastEventTestCases = [26, 30, 31];

  test.each(eventTestCases)(
    '방문날짜에 따라 크리스마스 디데이 할인 이벤트가 정상적으로 동작하는지 테스트한다.',
    (visitDate, expectedPrice) => {
      setChristmasDdayEvent(visitDate);

      expect(resultSalePrice()).toBe(expectedPrice);
    }
  );

  test.each(pastEventTestCases)(
    '이벤트 종료 이후에는 할인 금액이 0으로 반환되는지 테스트한다.',
    (visitDate) => {
      setChristmasDdayEvent(visitDate);

      expect(resultSalePrice()).toBe(0);
    }
  );
});
