import { MENU_PRIZE } from './constant.js';

const VALID_CONDITION = Object.freeze({
  minOrder: 1,
  maxOrder: 20,
});

const EVENT_CONDITION = Object.freeze({
  moreOrderAmount: 10_000,
  morePresentAmount: 120_000,
});

const EVENT_PLANNER = Object.freeze({
  startDate: 1,
  christmas: 25,
  specialDate: [3, 10, 17, 24, 25, 31],
  weekends: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
  endDate: 31,
});

const BADGE_PRIZE = Object.freeze({
  star: 5_000,
  tree: 10_000,
  santa: 20_000,
});

const SALE_PRIZE = Object.freeze({
  champagneSale: MENU_PRIZE.샴페인,
  specialSale: 1_000,
  startBasePrice: 1_000,
  additionalPricePerDay: 1_00,
  dailySale: 2_023,
});

export { VALID_CONDITION, EVENT_CONDITION, EVENT_PLANNER, BADGE_PRIZE, SALE_PRIZE };
