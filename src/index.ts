import { initFunctionDB, runFunc } from "./utils";

const YEAR = 2023;
const DAY = 5;
const PART = 1;

const main = () => {
  initFunctionDB();
  console.log(
    `Calculatin result for Part ${PART} of Question ${DAY} from the year ${YEAR}`
  );
  console.log(runFunc(YEAR, DAY, PART));
};

main();
