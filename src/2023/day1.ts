import { getInput, registerFunc } from "../utils";

const firstPuzzle = () => {
  let sum = 0;
  getInput().forEach((val) => {
    const numArr = [...(val.match(/[0-9]/g) ?? [])].map(Number);
    sum += Number(`${numArr.at(0)}${numArr.at(-1)}`);
  });
  return sum;
};

export const registerDayOne = () => {
  registerFunc(2023, 1, firstPuzzle);
};
