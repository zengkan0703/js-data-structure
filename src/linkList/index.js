class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
  change(value, key = 'next') {
    this[key] = value
  }
}

class LinkList {
  constructor(arr = []) {
    this.head = null;
    this.size = 0;
    this.init(arr);
  }
  init(arr) {
    const nodes = [];
    arr.map((a, i) => {
      this.size ++;
      const node = new Node(a);
      if (i !== 0) {
        nodes[i - 1].change(node, 'next')
      } else {
        this.head = node
      }
      nodes.push(node)
    })
  }
  append(val) {
    const node = new Node(val);
    let current = this.head;
    if (current) {
      while(current.next) {
        current = current.next
      }
      current.next = node
    } else {
      this.head = node
    }
    this.size ++
  }
  insert(position, value) {
    const node = new Node(value);
    if (!this.check(position)) {
      return
    }
    if (position === 0) {
      node.change(this.head);
      this.head = node;
    } else {
      const nextNode = this.find(position);
      if (nextNode !== -1) {
        node.change(nextNode)
      }
      const prevNode = this.find(position - 1);
      prevNode.change(node);
    }
    this.size ++;
  }
  delete(position) {
    if (!this.check(position)) {
      return
    }
    if (position === 0) {
      const node = this.find(1);
      this.head = node;
    } else {
      const nextNode = this.find(position + 1);
      const prevNode =  this.find(position - 1);
      const prev = prevNode === -1 ? this.head : prevNode;
      const next = nextNode === -1 ? null : nextNode;
      // console.log(prev, 'prev 55555')
      // console.log(next, 'next 55555')
      prev.next = next;
    }
    
    this.size --;
    // console.log(this, 'this 55555555')
    this.parse()
  }
  check(position) {
    if (position > this.size) {
      console.error('操作不能大于链表长度');
      return false
    }
    if (position < 0) {
      console.error('操作位置不能为负值');
      return false
    }
    return true
  }
  find(position) {
    let current = this.head;
    let currentIdx = 0;
    while(current) {
      if (currentIdx === position) {
        return current
      }
      currentIdx ++;
      current = current.next;
    }
    return -1;
  }
  parse() {
    let current = this.head;
    const values = [];
    while(current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values, 'values ')
    return values;
  }
}

const list1 = new LinkList([1,2,3])
list1.append(4)
// const position3 = list1.find(2);
// const position4 = list1.find(4);
// console.log(position3, 'position3 5555555')
// console.log(position4, 'position4 5555555')
list1.insert(0, '我是第一');
list1.insert(5, '我是第六');
list1.insert(3, '我是第三');

list1.delete(0);
list1.delete(2);
list1.delete(4);

const list2 = new LinkList();
const position1 = list2.find(0);
const position2 = list2.find(1);
// console.log(position1, 'position1 5555555')
// console.log(position2, 'position2 5555555')
