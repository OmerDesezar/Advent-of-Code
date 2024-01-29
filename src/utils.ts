import fs from "fs";

const functionDB: { [year: number]: { [day: number]: () => number } } = {};

export const getInput = (): string[] => {
  let ret: string[] = [];
  fs.readFile("Input.txt", (e, data) => {
    if (e) throw e;
    ret = data.toString().split("\r\n");
  });
  return ret;
};

export const registerFunc = (
  year: number,
  day: number,
  func: () => number
): void => {
  if (!functionDB[year]) functionDB[year] = {};
  functionDB[year][day] = func;
};

export const runFunc = (year: number, day: number): number => {
  return functionDB[year][day]();
};
