import { parentPort, workerData } from "worker_threads";

const func = ({ start, len, maps }) => {
	let min = Number.MAX_SAFE_INTEGER;
	for (let i = 0; i < len; i++) {
		let seed = start + i;
		Object.values(maps).forEach((map) => {
			const found = map.find(
				([_, src, len]) => seed >= src && seed < src + len
			);
			if (found) {
				const [dest, src] = found;
				seed += dest - src;
			}
		});
		min = Math.min(min, seed);
	}
	return min;
};

parentPort.postMessage(func(workerData));
