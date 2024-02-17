import { getInput, registerFunc } from "../utils";

const day10Part1 = () => {
	const matrix = getInput().map((s) => s.split(""));
	let x = 0;
	let y = 0;
	for (let i = 0; i < matrix.length; i++) {
		if (matrix[i].indexOf("S") !== -1) {
			x = i;
			y = matrix[i].indexOf("S");
			break;
		}
	}
	let count = 0;
	let last = "";
	while (count === 0 || matrix[x][y] !== "S") {
		if (["S", "|", "L", "J"].includes(matrix[x][y]) && last !== "up") {
			last = "down";
			x -= 1;
		} else if (["S", "|", "7", "F"].includes(matrix[x][y]) && last !== "down") {
			last = "up";
			x += 1;
		} else if (
			["S", "-", "L", "F"].includes(matrix[x][y]) &&
			last !== "right"
		) {
			last = "left";
			y += 1;
		} else if (["S", "-", "7", "J"].includes(matrix[x][y]) && last !== "left") {
			last = "right";
			y -= 1;
		}
		count++;
	}
	return count / 2;
};
const day10Part2 = () => {};

export const registerDay10 = () => {
	registerFunc(2023, 10, 1, day10Part1);
	registerFunc(2023, 10, 2, day10Part2);
};
