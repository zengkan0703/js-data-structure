import LinkList, { Node } from '../index';

export default class LoopLinkList extends LinkList {
  constructor(arr = []) {
    super(arr);
  }
  init(arr) {
    const lastNode = super.init(arr);
    lastNode && lastNode.change(this.head)
  }
  append(val) {
    const node = new Node(val);
    let current = this.head;
    if (this.head) {
      while(current.next !== this.head) {
        current = current.next;
      }
      node.change(this.head);
      current.change(node)
    } else {
      this.head = node
      node.change(this.head);
    }
    this.size ++;
    return this;
  }
  insert() {

  }
  delete(position) {
    if (!this.check(position)) {
      return
    }
    if (position === this.size) {
      return
    }
    if (position === 0) {
      const node = this.find(1);
      const tail = this.findTail();
      this.head = node;
      tail.change(this.head);
    } else {
      const prev = this.find(position - 1);
      const next = this.find(position + 1);
      //没有 next 说明删除的是最后一个元素
      const _next = next ? next : this.head;
      prev.change(_next);
    }
    this.size --;
    return this
  }
  findTail() {
    let current = this.head;
    while(current.next !== this.head) {
      current = current.next;
    }
    return current
  }
  parse() {
    let current = this.head;
    const values = [];
    while(current && current.next !== this.head) {
      values.push(current.value);
      current = current.next;
    }
    values.push(current.value);
    return values;
  }
}