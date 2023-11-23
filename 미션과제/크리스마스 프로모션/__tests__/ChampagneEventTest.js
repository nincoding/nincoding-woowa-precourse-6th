import ChampagneEvent from '../src/domain/models/ChampagneEvent.js';

describe('ChampagneEvent', () => {
  let champagneEvent;
  let resultChampagneCount;
  let resultPresentedPrice;

  const setChampagneEvent = (orderAmount) => {
    champagneEvent = new ChampagneEvent(orderAmount);
    resultChampagneCount = () => champagneEvent.getChampagne();
    resultPresentedPrice = () => champagneEvent.getPresentedPrice();
  };

  test('주문금액이 12만원 미만일때 샴페인 개수와 이벤트 가격이 0인지 테스트한다.', () => {
    const underAmount = 80_000;

    setChampagneEvent(underAmount);

    expect(resultChampagneCount()).toBe(0);
    expect(resultPresentedPrice()).toBe(0);
  });

  const expectedTestData = [
    [150_000, 1, 25_000],
    [240_000, 2, 50_000],
  ];

  test.each(expectedTestData)(
    '주문 금액이 120,000의 배수인 경우, 샴페인 개수와 이벤트 가격을 테스트한다.',
    (orderAmount, expectedChampagneCount, expectedPresentedPrice) => {
      setChampagneEvent(orderAmount);

      expect(resultChampagneCount()).toBe(expectedChampagneCount);
      expect(resultPresentedPrice()).toBe(expectedPresentedPrice);
    }
  );
});
