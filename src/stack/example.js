import Stack from './index';


const baseConverter = (num, base) => {
	const valueStack = new Stack();
	const digits = '0123456789ABCDEF'
	let value = '';
	while(num > 0) {
		const remainder = Math.floor(num % base);
		valueStack.push(remainder);
		num = Math.floor(num / base);
	}
	while(!valueStack.isEmpty()) {
		value += digits[valueStack.pop()];
	}
	return value;
}


//判断括号是否平衡
const bracketBalance = (bracket) => {
	const leftBrackets = '({[';
	const rightBrackets = ')}]';
	const stack = new Stack();
	let balance = true;
	bracket.split('').map(d => {
		if (leftBrackets.indexOf(d) !== -1) {
			stack.push(d)
		} else if (rightBrackets.indexOf(d) !== -1){
			const left = stack.pop();
			if (leftBrackets.indexOf(left) !== rightBrackets.indexOf(d)) {
				balance = false
			}
		}
	})
	balance = balance && stack.isEmpty()
	return balance;
}

//汉诺塔问题
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
	console.log(step, 'step 55555')
}

export {
	baseConverter, bracketBalance
}