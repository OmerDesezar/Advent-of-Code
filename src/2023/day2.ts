import { getInput, registerFunc } from "../utils";

// iterate over all values
// split iteration to id, reveals
// manipulate reveals for easier handling
// check game validity, add to sum if valid

const dayTwoPartOne = () => {
	let sum = 0;
	getInput().forEach((val) => {
		const round = val.split(":");
		const roundNum = round[0].replace("Game ", "");
		const reveals = round[1]
			.split(";")
			.map((revealStr) =>
				revealStr
					.split(",")
					.map((s) => s.split(" ").filter((s) => s.length > 0))
			);
		if (
			reveals.every((reveal) =>
				reveal.every(([count, dice]) => {
					switch (dice) {
						case "red":
							return Number(count) <= 12;
						case "green":
							return Number(count) <= 13;
						case "blue":
							return Number(count) <= 14;
						default:
							return true;
					}
				})
			)
		) {
			sum += Number(roundNum);
		}
	});
	return sum;
};

// iterate over all values
// manipulate reveals for easier handling
// calculate min dice count for each round, multiply and add to sum

const dayTwoPartTwo = () => {
	let sum = 0;
	getInput().forEach((val) => {
		const mins = { red: 1, green: 1, blue: 1 };
		const reveals = val
			.split(":")[1]
			.split(";")
			.map((revealStr) =>
				revealStr
					.split(",")
					.map((s) => s.split(" ").filter((s) => s.length > 0))
			);

		reveals.forEach((reveal) =>
			reveal.forEach(([count, dice]) => {
				mins[dice] = Math.max(mins[dice], Number(count));
			})
		);
		sum += mins.red * mins.green * mins.blue;
	});
	return sum;
};

export const registerDayTwo = () => {
	registerFunc(2023, 2, 1, dayTwoPartOne);
	registerFunc(2023, 2, 2, dayTwoPartTwo);
};
