import Stack from '../index';


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