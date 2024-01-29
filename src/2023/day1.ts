import { getInput, registerFunc } from "../utils";

const dayOnePartOne = () => {
  let sum = 0;
  getInput().forEach((val) => {
    const numArr = [...val.matchAll(/\d/g)];
    sum += Number(`${numArr.at(0)}${numArr.at(-1)}`);
  });
  return sum;
};

const dayOnePartTwo = () => {
  let sum = 0;
  const nums = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  getInput().forEach((val) => {
    const numArr = [
      ...val.matchAll(
        /\d|(?=(zero|one|two|three|four|five|six|seven|eight|nine))/g
      ),
    ].map((e) => (e[0].length > 0 ? e[0] : e[1]));

    let firstNum: string | number = numArr.at(0) as string;
    firstNum = firstNum.length > 1 ? nums.indexOf(firstNum) : Number(firstNum);
    let lastNum: string | number = numArr.at(-1) as string;
    lastNum = lastNum.length > 1 ? nums.indexOf(lastNum) : Number(lastNum);

    sum += Number(`${firstNum}${lastNum}`);
  });
  return sum;
};

export const registerDayOne = () => {
  registerFunc(2023, 1, 1, dayOnePartOne);
  registerFunc(2023, 1, 2, dayOnePartTwo);
};
