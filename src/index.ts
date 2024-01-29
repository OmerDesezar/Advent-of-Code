import { runFunc } from "./utils";

const YEAR = 2023;
const DAY = 1;

const main = () => {
  console.log(`Calculatin result for Question ${DAY} from the year ${YEAR}`);
  console.log(runFunc(YEAR, DAY));
};

main();
