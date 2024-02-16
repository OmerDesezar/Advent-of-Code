import { getInput, registerFunc } from "../utils";

const day7Part1 = () => {
	const data = getRestructuredData();
	const afterConversion = data.map(([hand, prize]) => [
		convertHandToValue(hand),
		Number(prize),
	]);
	let sum = 0;
	afterConversion.sort((a, b) => a[0] - b[0]);
	console.log(afterConversion);
	afterConversion.forEach(([_, prize], i) => (sum += prize * (i + 1)));
	return sum;
};

const day7Part2 = () => {
	const data = getRestructuredData();
	const afterConversion = data.map(([hand, prize]) => [
		convertHandToValueJ(hand),
		Number(prize),
		hand,
	]);
	let sum = 0;
	afterConversion.sort(compareHands);
	console.log(afterConversion);
	afterConversion.forEach(([_, prize], i) => (sum += Number(prize) * (i + 1)));
	return sum;
};

export const registerDay7 = () => {
	registerFunc(2023, 7, 1, day7Part1);
	registerFunc(2023, 7, 2, day7Part2);
};

const getRestructuredData = () => {
	return getInput().map((s) => s.split(" "));
};

const convertHandToValue = (s: string): number => {
	const hand = s.split("");
	let value = 0;
	const cardCounter: { [card: string]: number } = {};
	hand.forEach((card) => {
		cardCounter[card] ? cardCounter[card]++ : (cardCounter[card] = 1);
	});
	const count = Object.values(cardCounter);
	if (count.includes(5)) value += 1000000000000;
	else if (count.includes(4)) value += 100000000000;
	else if (count.includes(3) && count.includes(2)) value += 10000000000;
	else if (count.includes(3)) value += 1000000000;
	else if (count.filter((v) => v !== 2).length == 1) value += 100000000;
	else if (count.includes(2)) value += 10000000;

	let mult = 100000;
	hand.forEach((card) => {
		if (Number.isInteger(Number(card))) value += Number(card) * mult;
		else if (card === "T") value += 10 * mult;
		else if (card === "J") value += 11 * mult;
		else if (card === "Q") value += 12 * mult;
		else if (card === "K") value += 13 * mult;
		else if (card === "A") value += 14 * mult;
		mult /= 14;
	});
	return value;
};

const convertHandToValueJ = (s: string): number => {
	const hand = s.split("");
	const jokerCount = hand.filter((c) => c === "J").length;
	const cardCounter: { [card: string]: number } = {};
	hand.forEach((card) => {
		if (card === "J") return;
		cardCounter[card] ? cardCounter[card]++ : (cardCounter[card] = 1);
	});

	if (jokerCount > 0) {
		const maxCountKey = Object.keys(cardCounter).find(
			(k) => cardCounter[k] === Math.max(...Object.values(cardCounter))
		);
		if (maxCountKey) cardCounter[maxCountKey] += jokerCount;
	}

	const count = Object.values(cardCounter);
	let value = 0;
	if (count.includes(5)) value += 1000000000000;
	else if (count.includes(4)) value += 100000000000;
	else if (count.includes(3) && count.includes(2)) value += 10000000000;
	else if (count.includes(3)) value += 1000000000;
	else if (count.filter((v) => v !== 2).length === 1) value += 100000000;
	else if (count.includes(2)) value += 10000000;

	let mult = 100000;
	if (count.every((v) => v === 1)) {
		hand.forEach((card) => {
			if (Number.isInteger(Number(card))) value += Number(card) * mult;
			else if (card === "T") value += 10 * mult;
			else if (card === "J") value += 11 * mult;
			else if (card === "Q") value += 12 * mult;
			else if (card === "K") value += 13 * mult;
			else if (card === "A") value += 14 * mult;
			mult /= 14;
		});
	}
	return value;
};

const compareHands = (a, b) => {
	const diff = Number(a[0]) - Number(b[0]);
	if (diff !== 0) return diff;
	const cards = [
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"T",
		"J",
		"Q",
		"K",
		"A",
	];
	const handA: [] = a[2].split("");
	const handB: [] = a[2].split("");
	for (let i = 0; i < 5; i++) {
		const foundA = cards.findIndex((c) => c === handA[i]);
		const foundB = cards.findIndex((c) => c === handB[i]);
		const diff = foundA - foundB;
		if (diff !== 0) return diff;
	}
	return 0;
};
