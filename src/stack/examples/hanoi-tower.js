import Stack from '../index';

/**
 * 汉诺塔的层级
 * @param {number} num 
 */
export default function hanoiTower(num) {
	let step = 0;
	const moves = [];
	const arr = Array.from({length: num}).map((a, i, arr) => (arr.length - i));
	const stackA = new Stack(arr);
	const stackB = new Stack();
	const stackC = new Stack();
	const obj = {
		a: stackA,
		b: stackB,
		c: stackC
	}

	const loop = (n, a, b, c) => {
		if (n === 1) {
			step ++;
			obj[c].push(obj[a].pop());
			moves.push(`${a} ==> ${c}`);
			console.log('a:', obj.a.toString(),'b:', obj.b.toString(),'c:', obj.c.toString())
		} else {
			loop(n - 1, a, c, b);
			loop(1, a, b, c);
			loop(n - 1, b, a, c);
		}
	}
	loop(num, 'a', 'b', 'c');
	return { step, moves };
}
