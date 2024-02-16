import { getInput, registerFunc } from "../utils";

const day8Part1 = () => {
	const data = getInput();
	const instructions = data.splice(0, 2)[0];
	const nodes = getNodes(data);
	let counter = 0;
	let currNode = "AAA";
	while (currNode !== "ZZZ" || counter % instructions.length !== 0) {
		currNode =
			nodes[currNode][
				instructions.charAt(counter % instructions.length) === "L" ? 0 : 1
			];
		counter++;
	}
	return counter;
};

const day8Part2 = () => {
	const data = getInput();
	const turns = data.splice(0, 2)[0];
	const nodes = getNodes(data);
	let counter = 0;
	let currNodes = Object.keys(nodes).filter((n) => n.endsWith("A"));
	while (
		!currNodes.every((n) => n.endsWith("Z")) ||
		counter % turns.length !== 0
	) {
		const turn = turns.charAt(counter % turns.length) === "L" ? 0 : 1;
		currNodes = currNodes.map((n) => nodes[n][turn]);
		counter++;
	}
	return counter;
};

export const registerDay8 = () => {
	registerFunc(2023, 8, 1, day8Part1);
	registerFunc(2023, 8, 2, day8Part2);
};

const getNodes = (data: string[]) => {
	const nodes = {};
	data.forEach((node) => {
		node = node.replace("(", "").replace(")", "");
		const split = node.split("=");
		nodes[split[0].trim()] = split[1].split(",").map((s) => s.trim());
	});
	return nodes;
};
