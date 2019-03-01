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

export {
	baseConverter, bracketBalance
}