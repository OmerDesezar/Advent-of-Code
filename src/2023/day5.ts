import { getInput, registerFunc } from "../utils";

const dayFivePartOne = () => {
  const data = getInput();
  const seeds = data[0]
    .split(":")[1]
    .split(" ")
    .filter((s) => s !== "")
    .map(Number);
  const maps: { [mapName: string]: number[][] } = {};
  let currVal: number[][] = [];
  let currName: string = "";
  for (let i = 1; i < data.length; i++) {
    const d = data[i];
    if (d.includes(":")) {
      if (currVal.length > 0) maps[currName] = currVal;
      currName = d;
      currVal = [];
    } else if (d !== "") currVal.push(d.split(" ").map(Number));
  }
  maps[currName] = currVal;

  let min: number = Number.MAX_SAFE_INTEGER;
  seeds.forEach((seed) => {
    Object.values(maps).forEach((map) => {
      const found = map.find(
        ([_, src, len]) => seed >= src && seed < src + len
      );
      if (found) {
        const [dest, src] = found;
        seed += dest - src;
      }
    });
    min = Math.min(min, seed);
  });
  return min;
};

const dayFivePartTwo = () => {
  let sum = 0;
  getInput();
  return sum;
};

export const registerDayFive = () => {
  registerFunc(2023, 5, 1, dayFivePartOne);
  registerFunc(2023, 5, 2, dayFivePartTwo);
};
