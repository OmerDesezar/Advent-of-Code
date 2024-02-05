import { getInput, registerFunc } from "../utils";

const day6Part1 = () => {
  const data = getInput();
  const times = getNumsArr(data[0]);
  const distances = getNumsArr(data[1]);
  let sum = 1;
  for (let i = 0; i < times.length; i++) {
    let currTime = 0;
    let counter = 0;
    while (currTime <= times[i]) {
      if (currTime * (times[i] - currTime) > distances[i]) counter++;
      currTime++;
    }
    sum *= counter;
  }
  return sum;
};

const day6Part2 = () => {
  const data = getInput();
  const time = Number(getNumsArr(data[0]).join(""));
  const distance = Number(getNumsArr(data[1]).join(""));
  let sum = 0;
  let currTime = 0;
  while (currTime <= time) {
    if (currTime * (time - currTime) > distance) sum++;
    currTime++;
  }
  return sum;
};

export const registerDay6 = () => {
  registerFunc(2023, 6, 1, day6Part1);
  registerFunc(2023, 6, 2, day6Part2);
};

const getNumsArr = (s: string): number[] => {
  return s
    .split(":")[1]
    .split(" ")
    .filter((sub) => sub !== "")
    .map(Number);
};
