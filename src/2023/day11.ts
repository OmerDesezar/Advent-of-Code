import { getInput, registerFunc } from "../utils";

const day11Part1 = () => {
	const universe = getInput().map((s) => s.split(""));
	const addIndexes: number[] = [];
	for (let i = 0; i < universe.length; i++) {
		if (!universe[i].includes("#")) addIndexes.unshift(i);
	}
	addIndexes.forEach((i) => universe.splice(i, 0, universe[i]));
	addIndexes.length = 0;
	for (let i = 0; i < universe[0].length; i++) {
		if (!universe.map((arr) => arr[i]).includes("#")) addIndexes.unshift(i);
	}
	addIndexes.forEach((i) => universe.forEach((arr) => arr.splice(i, 0, ".")));
	const galaxyCoords: number[][] = [];
	for (let i = 0; i < universe.length; i++) {
		for (let j = 0; j < universe[0].length; j++) {
			if (universe[i][j] === "#") galaxyCoords.push([i, j]);
		}
	}
	let counter = 0;
	for (let i = 0; i < galaxyCoords.length; i++) {
		for (let j = i + 1; j < galaxyCoords.length; j++) {
			const [xA, yA] = galaxyCoords[i];
			const [xB, yB] = galaxyCoords[j];
			counter += Math.abs(xA - xB);
			counter += Math.abs(yA - yB);
		}
	}
	return counter;
};

const day11Part2 = () => {};

export const registerDay11 = () => {
	registerFunc(2023, 11, 1, day11Part1);
	registerFunc(2023, 11, 2, day11Part2);
};
