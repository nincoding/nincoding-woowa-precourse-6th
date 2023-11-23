import ChristmasPromotion from './domain/ChristmasPromotion.js';
import ChristmasPromotionController from './controller/ChristmasPromotionController.js';

class App {
  #controller;

  constructor() {
    this.#controller = new ChristmasPromotionController(new ChristmasPromotion());
  }

  async run() {
    await this.#controller.startService();
  }
}

export default App;
