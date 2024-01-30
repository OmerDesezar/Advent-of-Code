import { getInput, registerFunc } from "../utils";

const dayFourPartOne = () => {
  let sum = 0;
  getInput().forEach((val) => {
    let prize = 0;
    const [winNums, tryNums] = val
      .split(":")[1]
      .split("|")
      .map((nums) => nums.split(" ").filter((s) => s !== ""));
    tryNums.forEach((tryNum) => {
      if (winNums.includes(tryNum)) {
        prize = prize == 0 ? 1 : prize * 2;
      }
    });
    sum += prize;
  });
  return sum;
};

const dayFourPartTwo = () => {
  const cards: number[][] = [];
  getInput().forEach((val) => {
    let prize = 0;
    const [winNums, tryNums] = val
      .split(":")[1]
      .split("|")
      .map((nums) => nums.split(" ").filter((s) => s !== ""));
    tryNums.forEach((tryNum) => {
      if (winNums.includes(tryNum)) prize++;
    });
    cards.push([1, prize]);
  });
  for (let i = 0; i < cards.length; i++) {
    let [count, points] = cards[i];
    for (let p = 1; p <= points; p++) {
      if (cards[i + p]) cards[i + p][0] += count;
    }
  }
  return cards.reduce((acc, [count]) => acc + count, 0);
};

export const registerDayFour = () => {
  registerFunc(2023, 4, 1, dayFourPartOne);
  registerFunc(2023, 4, 2, dayFourPartTwo);
};
