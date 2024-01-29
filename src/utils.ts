import fs from "fs";
import { init2023 } from "./2023/entry";

const functionDB: {
  [year: number]: { [day: number]: { [part: number]: () => number } };
} = {};

export const getInput = (): string[] => {
  return fs.readFileSync("Input.txt").toString().split("\r\n");
};

export const registerFunc = (
  year: number,
  day: number,
  part: number,
  func: () => number
): void => {
  if (!functionDB[year]) functionDB[year] = {};
  if (!functionDB[year][day]) functionDB[year][day] = {};
  functionDB[year][day][part] = func;
};

export const runFunc = (year: number, day: number, part: number): number => {
  return functionDB[year][day][part]();
};

export const initFunctionDB = (): void => {
  init2023();
};
