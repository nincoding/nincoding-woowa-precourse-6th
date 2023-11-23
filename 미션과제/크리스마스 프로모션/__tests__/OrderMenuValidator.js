import OrderMenuValidator from '../src/domain/validators/OrderMenuValidator.js';
import { ERROR_MESSAGE } from '../src/constants/errorMessage.js';

describe('OrderMenuValidator', () => {
  const invalidOrderMessage = () => ERROR_MESSAGE.invalidOrder;

  const invalidOrderTestData = [
    {
      orderMenu: [{ 해산물파스타: 2 }, { 레드와인: 1 }, { 초코케이크: 1 }, { 레드와인: 1 }],
      expectedErrorMessage: invalidOrderMessage(),
    },
    {
      orderMenu: [{ 치킨: 2 }, { 피자: 1 }, { 초코케이크: 1 }],
      expectedErrorMessage: invalidOrderMessage(),
    },
    {
      orderMenu: [{ '': 2 }, { NaN: 1 }, { undefined: 10 }],
      expectedErrorMessage: invalidOrderMessage(),
    },
    {
      orderMenu: [{ 해산물파스타: -2 }, { 레드와인: 1.5 }, { 초코케이크: 0 }],
      expectedErrorMessage: invalidOrderMessage(),
    },
  ];

  const invalidOnlyDrinkTestData = [
    {
      orderMenu: [{ 레드와인: 1 }],
      expectedErrorMessage: invalidOrderMessage(),
    },
    {
      orderMenu: [{ 레드와인: 1 }, { 샴페인: 1 }],
      expectedErrorMessage: invalidOrderMessage(),
    },
  ];

  const invalidMaximumMenuTestData = [
    {
      orderMenu: [{ 해산물파스타: 22 }, { 레드와인: 1 }],
      expectedErrorMessage: invalidOrderMessage(),
    },
    {
      orderMenu: [{ 해산물파스타: 10 }, { 레드와인: 10 }, { 샴페인: 1 }],
      expectedErrorMessage: invalidOrderMessage(),
    },
  ];

  test.each(invalidOrderTestData)(
    '입력값 형식이 유효하지 않은 주문일 때 에러메시지를 출력하는지 테스트한다.',
    ({ orderMenu, expectedErrorMessage }) => {
      const validateOrderMenu = () => OrderMenuValidator.validate(orderMenu);

      expect(validateOrderMenu).toThrowError(expectedErrorMessage);
    }
  );

  test.each(invalidOnlyDrinkTestData)(
    '음료만 주문했을 때 에러메시지를 출력하는지 테스트한다.',
    ({ orderMenu, expectedErrorMessage }) => {
      const validateOrderMenu = () => OrderMenuValidator.validate(orderMenu);

      expect(validateOrderMenu).toThrowError(expectedErrorMessage);
    }
  );

  test.each(invalidMaximumMenuTestData)(
    '최대 주문 개수를 초과했을 때 에러메시지를 출력하는지 테스트한다.',
    ({ orderMenu, expectedErrorMessage }) => {
      const validateOrderMenu = () => OrderMenuValidator.validate(orderMenu);

      expect(validateOrderMenu).toThrowError(expectedErrorMessage);
    }
  );
});
