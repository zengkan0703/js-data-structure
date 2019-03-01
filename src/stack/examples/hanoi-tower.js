import Stack from '../index';

/**
 * 汉诺塔的层级
 * @param {number} num 
 */
const hanoiTower = (num) => {
	const arr = Array.from({length: num}).map((a, i) => i + 1);
	const stackA = new Stack(arr);
	const stackB = new Stack();
	const stackC = new Stack();
	let step = 0;

	while(stackC.size() < num) {
		const item = stackA.pop();
		step ++;
	}
	return step;
}

//递归汉诺塔
const hanoiTower2 = (num) => {
	let step = 0;
	const loop = (n, a, b, c) => {
		if (n === 1) {
			step ++;
			// console.log(`${a} ==> ${c}`)
		} else {
			loop(n - 1, a, c, b);
			loop(1, a, b, c);
			loop(n - 1, b, a, c);
		}
	}
	loop (num, 'A', 'B', 'C')
	return step;
}
