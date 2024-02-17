import { getInput, registerFunc } from "../utils";

const day8Part1 = () => {
	const data = getInput();
	const turns = data.splice(0, 2)[0];
	const nodes = getNodes(data);
	let counter = 0;
	let currNode = "AAA";
	while (currNode !== "ZZZ" || counter % turns.length !== 0) {
		currNode =
			nodes[currNode][turns.charAt(counter % turns.length) === "L" ? 0 : 1];
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
	const counters: number[] = [];
	currNodes.forEach((node) => {
		while (!node.endsWith("Z") || counter % turns.length !== 0) {
			node = nodes[node][turns.charAt(counter % turns.length) === "L" ? 0 : 1];
			counter++;
		}
		counters.push(counter);
		counter = 0;
	});
	return lcmOfArray(counters);
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

const gcd = (a: number, b: number) => {
	if (b === 0) return a;
	return gcd(b, a % b);
};

const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

const lcmOfArray = (numbers: number[]) => {
	let result = 1;
	for (let i = 0; i < numbers.length; i++) {
		result = lcm(result, numbers[i]);
	}
	return result;
};
