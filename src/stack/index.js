export default class Stack {
	constructor(arr = []) {
		this.items = arr;
	}
	push(ele) {
		this.items.push(ele);
		return this.items;
	}
	pop() {
		return this.items.pop();
	}
	peek() {
		return this.items[this.items.length - 1];
	}
	isEmpty() {
		return this.items.length === 0;
	}
	clear() {
		this.item = [];
		return this.items;
	}
	size() {
		return this.items.length
	}
	toString() {
		return this.items.toString();
	}
}