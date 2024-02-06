import { getInput, registerFunc } from "../utils";

const day7Part1 = () => {
  const data = getRestructuredData();
  const afterConversion = data.map(([hand, prize]) => [
    convertHandToValue(hand),
    Number(prize),
  ]);
  afterConversion.sort((a, b) => a[0] - b[0]);
  let sum = 0;
  afterConversion.forEach(([_, prize], i) => {
    sum += prize * (i + 1);
  });
  return sum;
};

const day7Part2 = () => {};

export const registerDay7 = () => {
  registerFunc(2023, 7, 1, day7Part1);
  registerFunc(2023, 7, 2, day7Part2);
};

const getRestructuredData = () => {
  return getInput().map((s) => s.split(" "));
};

const convertHandToValue = (s: string): number => {
  const hand = s.split("");
  let value = 0;
  const cardCounter: { [card: string]: number } = {};
  hand.forEach((card) => {
    cardCounter[card] ? cardCounter[card]++ : (cardCounter[card] = 1);
  });
  const count = Object.values(cardCounter);
  if (count.includes(5)) value += 1000000000000;
  else if (count.includes(4)) value += 100000000000;
  else if (count.includes(3) && count.includes(2)) value += 10000000000;
  else if (count.includes(3)) value += 1000000000;
  else if (count.filter((v) => v !== 2).length == 1) value += 100000000;
  else if (count.includes(2)) value += 10000000;

  let mult = 100000;
  hand.forEach((card) => {
    if (Number.isInteger(Number(card))) value += Number(card) * mult;
    else if (card === "T") value += 10 * mult;
    else if (card === "J") value += 11 * mult;
    else if (card === "Q") value += 12 * mult;
    else if (card === "K") value += 13 * mult;
    else if (card === "A") value += 14 * mult;

    mult /= 14;
  });

  return value;
};
