import OrderMenuValidator from '../domain/validators/OrderMenuValidator.js';
import VisitDateValidator from '../domain/validators/VisitDateValidator.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import errorHandler from '../utils/errorHandler.js';

class ChristmasPromotionController {
  #service;
  #visitDate;
  #orderMenu;

  constructor(ChristmasPromotion) {
    this.#service = ChristmasPromotion;

    OutputView.printStartService();
  }

  async startService() {
    await this.#initService();

    const promotionData = this.#getPromotionServiceData();

    this.#printPromotionService(promotionData);
  }

  async #initService() {
    const printError = (message) => OutputView.printErrorMessage(message);

    await errorHandler(async () => await this.#requireValidVisitDate(), printError);
    await errorHandler(async () => await this.#requireValidOrderMenu(), printError);
  }

  async #requireValidVisitDate() {
    const inputVisitDate = await InputView.getVisitDate();

    VisitDateValidator.validate(inputVisitDate);

    this.#visitDate = inputVisitDate;
  }

  async #requireValidOrderMenu() {
    const inputOrderMenu = await InputView.getOrderMenu();

    OrderMenuValidator.validate(inputOrderMenu);

    this.#orderMenu = inputOrderMenu;
  }

  #getPromotionServiceData() {
    const totalOrderAmount = this.#service.getTotalOrderAmount(this.#orderMenu);
    const presentedChampagne = this.#service.getPresentedChampagne();
    const totalSaleInfo = this.#service.getTotalSaleInfo(this.#visitDate, this.#orderMenu);
    const totalSaleAmount = this.#service.getTotalSaleAmount();
    const estimatedAmount = this.#service.getEstimatedAmount();
    const badge = this.#service.getBadge();

    return {
      totalOrderAmount,
      presentedChampagne,
      totalSaleInfo,
      totalSaleAmount,
      estimatedAmount,
      badge,
    };
  }

  #printPromotionService(promotionData) {
    OutputView.printPreviewbenefits(this.#visitDate);
    OutputView.printOrderMenuInfo(this.#orderMenu);

    OutputView.printTotalOrderAmount(promotionData.totalOrderAmount);
    OutputView.printPresentedMenu(promotionData.presentedChampagne);
    OutputView.printTotalSaleInfo(promotionData.totalSaleInfo);
    OutputView.printTotalSaleAmount(promotionData.totalSaleAmount);
    OutputView.printEstimatedAmount(promotionData.estimatedAmount);
    OutputView.printBadge(promotionData.badge);
  }
}

export default ChristmasPromotionController;
