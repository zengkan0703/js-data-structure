export default class  Queue {
  constructor(arr = []) {
    this.items = arr;
  }
  push(eles) {
    return this.items.push(eles);
  }
  shift() {
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length; 
  }
  toString() {
		return this.items.toString();
	}
}