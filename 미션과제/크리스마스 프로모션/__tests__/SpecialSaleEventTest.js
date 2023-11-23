import SpecialSaleEvent from '../src/domain/models/SpecialSaleEvent.js';

describe('SpecialSaleEvent', () => {
  test('특별 할인 이벤트 날짜에 해당한 경우 반환 값을 테스트한다.', () => {
    const visitDateWithEvent = 3;
    const visitDateWithoutEvent = 15;

    const specialSaleEventWithEvent = new SpecialSaleEvent(visitDateWithEvent);
    const specialSaleEventWithoutEvent = new SpecialSaleEvent(visitDateWithoutEvent);

    expect(specialSaleEventWithEvent.getSpecialSalePrice()).toBe(1_000);
    expect(specialSaleEventWithoutEvent.getSpecialSalePrice()).toBe(0);
  });
});
