import ChristmasPromotion from '../src/domain/ChristmasPromotion.js';

describe('ChristmasPromotion', () => {
  let christmasPromotion;

  beforeEach(() => {
    christmasPromotion = new ChristmasPromotion();
  });

  const testCases = [
    {
      visitDate: 26,
      orderMenu: [{ 타파스: 1 }, { 제로콜라: 1 }],
      totalOrderAmount: 8_500,
      presentedChampagne: 0,
      totalSaleInfo: {
        '크리스마스 디데이 할인': 0,
        '특별 할인': 0,
        '증정 이벤트': 0,
      },
      totalSaleAmount: 0,
      estimatedAmount: 85_00,
      badge: '없음',
    },
    {
      visitDate: 3,
      orderMenu: [{ 티본스테이크: 1 }, { 바비큐립: 1 }, { 초코케이크: 2 }, { 제로콜라: 1 }],
      totalOrderAmount: 142_000,
      presentedChampagne: 1,
      totalSaleInfo: {
        '크리스마스 디데이 할인': 1_200,
        '평일 할인': 4_046,
        '특별 할인': 1_000,
        '증정 이벤트': 25_000,
      },
      totalSaleAmount: 31_246,
      estimatedAmount: 135_754,
      badge: '산타',
    },
  ];

  test.each(testCases)(
    '총 주문 금액이 정확히 계산되는지 테스트한다.',
    ({ orderMenu, totalOrderAmount }) => {
      expect(christmasPromotion.getTotalOrderAmount(orderMenu)).toBe(totalOrderAmount);
    }
  );

  test.each(testCases)(
    '증정 샴페인 개수가 정확히 계산되는지 테스트한다.',
    ({ orderMenu, presentedChampagne }) => {
      christmasPromotion.getTotalOrderAmount(orderMenu);

      expect(christmasPromotion.getPresentedChampagne()).toBe(presentedChampagne);
    }
  );

  test.each(testCases)(
    '혜택 내역 정보가 정확히 계산되는지 테스트한다.',
    ({ visitDate, orderMenu, totalSaleInfo }) => {
      christmasPromotion.getTotalOrderAmount(orderMenu);
      christmasPromotion.getPresentedChampagne();

      expect(christmasPromotion.getTotalSaleInfo(visitDate, orderMenu)).toStrictEqual(
        totalSaleInfo
      );
    }
  );

  test.each(testCases)(
    '총 할인 금액이 정확히 계산되는지 테스트한다.',
    ({ visitDate, orderMenu, totalSaleAmount }) => {
      christmasPromotion.getTotalOrderAmount(orderMenu);
      christmasPromotion.getPresentedChampagne();
      christmasPromotion.getTotalSaleInfo(visitDate, orderMenu);

      expect(christmasPromotion.getTotalSaleAmount()).toBe(totalSaleAmount);
    }
  );

  test.each(testCases)(
    '할인이 적용된 후 예상 결제 금액이 정확히 계산되는지 테스트한다.',
    ({ visitDate, orderMenu, estimatedAmount }) => {
      christmasPromotion.getTotalOrderAmount(orderMenu);
      christmasPromotion.getPresentedChampagne();
      christmasPromotion.getTotalSaleInfo(visitDate, orderMenu);
      christmasPromotion.getTotalSaleAmount();

      expect(christmasPromotion.getEstimatedAmount()).toBe(estimatedAmount);
    }
  );

  test.each(testCases)(
    '총 할인 금액을 기준으로 알맞는 배지를 반환하는지 테스트한다.',
    ({ visitDate, orderMenu, badge }) => {
      christmasPromotion.getTotalOrderAmount(orderMenu);
      christmasPromotion.getPresentedChampagne();
      christmasPromotion.getTotalSaleInfo(visitDate, orderMenu);
      christmasPromotion.getTotalSaleAmount();
      christmasPromotion.getEstimatedAmount();

      expect(christmasPromotion.getBadge()).toBe(badge);
    }
  );
});
