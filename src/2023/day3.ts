import { getInput, registerFunc } from "../utils";

// manipulate input into a matrix
// iterate over it
// search recursively each spot and add to sum

const dayThreePartOne = () => {
	let sum = 0;
	const matrix = getInput().map((str) => str.split(""));
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			sum += recSearchPart1(matrix, i, j);
		}
	}
	return sum;
};

const dayThreePartTwo = () => {
	let sum = 0;
	const matrix = getInput().map((str) => str.split(""));
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {}
	}
	return sum;
};

export const registerDayThree = () => {
	registerFunc(2023, 3, 1, dayThreePartOne);
	registerFunc(2023, 3, 2, dayThreePartTwo);
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
