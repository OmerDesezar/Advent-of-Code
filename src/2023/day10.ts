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

const day10Part2 = () => {
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
	let start = true;
	let last = "";
	while (start || !matrix[x][y].includes("S")) {
		if (["S", "|", "L", "J"].includes(matrix[x][y]) && last !== "up") {
			last = "down";
			matrix[x][y] += "*";
			x -= 1;
		} else if (["S", "|", "7", "F"].includes(matrix[x][y]) && last !== "down") {
			last = "up";
			matrix[x][y] += "*";
			x += 1;
		} else if (
			["S", "-", "L", "F"].includes(matrix[x][y]) &&
			last !== "right"
		) {
			last = "left";
			matrix[x][y] += "*";
			y += 1;
		} else if (["S", "-", "7", "J"].includes(matrix[x][y]) && last !== "left") {
			last = "right";
			matrix[x][y] += "*";
			y -= 1;
		}
		start = false;
	}

	let sType = "";
	if (["|*", "7*", "F*"].includes(matrix[x - 1][y])) sType += "up";
	if (["|*", "L*", "J*"].includes(matrix[x + 1][y])) sType += "down";
	if (["-*", "L*", "F*"].includes(matrix[x][y - 1])) sType += "left";
	if (["-*", "7*", "J*"].includes(matrix[x][y + 1])) sType += "right";
	if (sType === "updown") matrix[x][y] = "|*";
	if (sType === "upleft") matrix[x][y] = "|*";
	if (sType === "right") matrix[x][y] = "|*";
	if (sType === "downleft") matrix[x][y] = "|*";
	if (sType === "downright") matrix[x][y] = "|*";
	if (sType === "leftright") matrix[x][y] = "|*";

	let counter = 0;
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j].includes("*")) continue;
			let wallCounter = 0;
			let lastFound = "";
			for (let k = j + 1; k < matrix[i].length; k++) {
				if (!matrix[i][k].includes("*") || matrix[i][k].includes("-")) continue;
				if (matrix[i][k].includes("|")) {
					wallCounter++;
					continue;
				}
				if (!lastFound) lastFound = matrix[i][k];
				else {
					if (matrix[i][k].includes("7") && lastFound.includes("L")) {
						wallCounter++;
					}
					if (matrix[i][k].includes("J") && lastFound.includes("F")) {
						wallCounter++;
					}
					lastFound = "";
				}
			}
			if (wallCounter % 2 !== 0) counter++;
		}
	}
	return counter;
};

export const registerDay10 = () => {
	registerFunc(2023, 10, 1, day10Part1);
	registerFunc(2023, 10, 2, day10Part2);
};
