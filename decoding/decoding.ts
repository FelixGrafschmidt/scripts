import { readFile, writeFile } from "fs/promises";

export async function decodeFile(): Promise<void> {
	const buffer = await readFile("./decoding/input");
	const text = buffer.toString("utf-8");
	const arr = text.split(" ");
	const decimal = [];
	for (let i = 0; i < arr.length; i++) {
		decimal.push(parseInt(arr[i], 2));
	}
	await writeFile("./decoding/output", decimal.join(" "));
}

decodeFile();

function sumDigits(n: number) {
	let input = n;
	let output = 0;
	while (input) {
		output += input % 10;
		input = Math.floor(input / 10);
	}
	return output;
}
