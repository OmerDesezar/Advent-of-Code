import { initFunctionDB, runFunc } from "./utils";

const YEAR = 2023;
const DAY = 8;
const PART = 2;

const main = async () => {
	initFunctionDB();
	console.log(
		`Year:     ${YEAR}\nQuestion: ${DAY}\nPart:     ${PART}\nCalculating...`
	);
	console.log(await runFunc(YEAR, DAY, PART));
};

main();
