import { Console } from '@woowacourse/mission-utils';
import formatOrderMenu from '../utils/formatOrderMenu.js';
import INPUT_MESSAGE from '../constants/inputMessage.js';

const InputView = {
  async getVisitDate() {
    const visitDate = await Console.readLineAsync(INPUT_MESSAGE.visitDate);

    return Number(visitDate);
  },

  async getOrderMenu() {
    const orderMenu = await Console.readLineAsync(INPUT_MESSAGE.orderMenu);

    return formatOrderMenu(orderMenu);
  },
};

export default InputView;
