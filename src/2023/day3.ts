import { getInput, registerFunc } from "../utils";

// manipulate input into a matrix
// iterate over it
// search recursively each spot and add to sum

const day3Part1 = () => {
  let sum = 0;
  const matrix = getInput().map((str) => str.split(""));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      sum += recSearchPart1(matrix, i, j);
    }
  }
  return sum;
};

const day3Part2 = () => {
  let sum = 0;
  const matrix = getInput().map((str) => str.split(""));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== "*") continue;
      sum += searchAround(matrix, i, j);
    }
  }
  return sum;
};

export const registerDay3 = () => {
  registerFunc(2023, 3, 1, day3Part1);
  registerFunc(2023, 3, 2, day3Part2);
};

const recSearchPart1 = (matrix, i, j, valid = false, sum = 0) => {
  //default exit
  if (!matrix[i][j] || matrix[i][j] === ".") return valid ? sum : 0;
  //exit on symbol
  if (Number.isNaN(Number(matrix[i][j]))) return sum;
  //[i][j] is num, reset it and add it to sum
  sum = sum * 10 + Number(matrix[i][j]);
  matrix[i][j] = ".";

  //checl all surroundings
  if (
    matrix[i - 1]?.[j - 1] &&
    matrix[i - 1][j - 1] !== "." &&
    Number.isNaN(Number(matrix[i - 1][j - 1]))
  ) {
    valid = true;
  }
  if (
    matrix[i][j - 1] &&
    matrix[i][j - 1] !== "." &&
    Number.isNaN(Number(matrix[i][j - 1]))
  ) {
    valid = true;
  }
  if (
    matrix[i + 1]?.[j - 1] &&
    matrix[i + 1][j - 1] !== "." &&
    Number.isNaN(Number(matrix[i + 1][j - 1]))
  ) {
    valid = true;
  }
  if (
    matrix[i - 1]?.[j] &&
    matrix[i - 1][j] !== "." &&
    Number.isNaN(Number(matrix[i - 1][j]))
  ) {
    valid = true;
  }
  if (
    matrix[i + 1]?.[j] &&
    matrix[i + 1][j] !== "." &&
    Number.isNaN(Number(matrix[i + 1][j]))
  ) {
    valid = true;
  }
  if (
    matrix[i - 1]?.[j + 1] &&
    matrix[i - 1][j + 1] !== "." &&
    Number.isNaN(Number(matrix[i - 1][j + 1]))
  ) {
    valid = true;
  }
  if (
    matrix[i + 1]?.[j + 1] &&
    matrix[i + 1][j + 1] !== "." &&
    Number.isNaN(Number(matrix[i + 1][j + 1]))
  ) {
    valid = true;
  }
  //search on next spot
  return recSearchPart1(matrix, i, j + 1, valid, sum);
};

const searchAround = (matrix, i, j) => {
  const arr = [
    findNum(matrix, i - 1, j - 1),
    findNum(matrix, i - 1, j),
    findNum(matrix, i - 1, j + 1),
    findNum(matrix, i, j - 1),
    findNum(matrix, i, j + 1),
    findNum(matrix, i + 1, j - 1),
    findNum(matrix, i + 1, j),
    findNum(matrix, i + 1, j + 1),
  ].filter((v) => v);
  const set = new Set(
    arr.map((val) => JSON.stringify(val).replace("[", "").replace("]", ""))
  );
  if (set.size !== 2) return 0;
  let [firstArrS, secondArrS] = [...set.values()].map((s) => s.split(","));
  const firstArr = firstArrS.map(Number);
  const secondArr = secondArrS.map(Number);
  let firstNum = 0;
  let secondNum = 0;
  for (let i = firstArr[1]; i <= firstArr[2]; i++) {
    firstNum = firstNum * 10 + Number(matrix[firstArr[0]][i]);
  }
  for (let i = secondArr[1]; i <= secondArr[2]; i++) {
    secondNum = secondNum * 10 + Number(matrix[secondArr[0]][i]);
  }
  return firstNum * secondNum;
};

const findNum = (matrix, i, j) => {
  if (Number.isNaN(Number(matrix[i][j]))) return null;
  while (Number.isInteger(Number(matrix[i][j - 1]))) j--;
  const left = j;
  while (Number.isInteger(Number(matrix[i][j + 1]))) j++;
  const right = j;
  return [i, left, right];
};
