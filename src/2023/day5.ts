import { getInput, registerFunc } from "../utils";
import { Worker } from "worker_threads";

const dayFivePartOne = async () => {
  const { seeds, maps } = getRestructuredData();
  const promiseArr: any[] = [];
  seeds.forEach((seed) => {
    promiseArr.push(asyncFind(seed, 1, maps));
  });
  const values = await Promise.all(promiseArr);
  return Math.min(...values);
};

const dayFivePartTwo = async () => {
  const { seeds, maps } = getRestructuredData();
  const promiseArr: any[] = [];
  for (let i = 0; i < seeds.length; i = i + 2) {
    const start = seeds[i];
    const len = seeds[i + 1];
    promiseArr.push(asyncFind(start, len, maps));
  }
  const values = await Promise.all(promiseArr);
  return Math.min(...values);
};

export const registerDayFive = () => {
  registerFunc(2023, 5, 1, dayFivePartOne);
  registerFunc(2023, 5, 2, dayFivePartTwo);
};

const asyncFind = async (start, len, maps) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./src/2023/workers/day5part2Worker.js", {
      workerData: { start, len, maps },
    });
    worker.once("message", resolve);
    worker.once("error", reject);
  });
};

const getRestructuredData = () => {
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

  return { seeds, maps };
};
