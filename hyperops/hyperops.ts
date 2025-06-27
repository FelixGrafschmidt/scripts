// function I(a: number, b: number) {
// 	let result = 0;
// 	for (let index = 0; index < a; index++) {
// 		result++;
// 	}
// 	for (let index = 0; index < b; index++) {
// 		result++;
// 	}
// 	return result;
// }

// console.log(I(3, 4)); // 7

// function II(a: number, b: number) {
// 	let result = 0;
// 	for (let index = 0; index < a; index++) {
// 		result += I(a, index);
// 	}
// 	return result;
// }

// console.log(II(3, 4)); // 12

function hyper(base: number, level: number, modifier: number): number {
	switch (true) {
		case level === 0: {
			let result = 1;
			for (let index = 0; index < modifier; index++) {
				result++;
			}
			return result;
		}
		// case level === 1: {
		// 	let result = 0;
		// 	for (let index = 0; index < modifier; index++) {
		// 		result += hyper(result, level - 1, index);
		// 	}
		// 	return result;
		// }
		default: {
			let result = 0;
			for (let index = 0; index < modifier; index++) {
				result += hyper(result, level - 1, index);
			}
			return result;
		}
	}
}

console.log(hyper(3, 2, 3));
