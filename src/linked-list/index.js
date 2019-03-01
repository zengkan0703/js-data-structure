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
    return nodes[nodes.length - 1]
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
    this.size ++;
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
      if (nextNode) {
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
    if (position === this.size) {
      return
    }
    if (position === 0) {
      const node = this.find(1);
      this.head = node;
    } else {
      const nextNode = this.find(position + 1);
      const prevNode =  this.find(position - 1);
      const next = nextNode ? nextNode : null;
      prevNode.next = next;
    }
    this.size --;
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
    return null;
  }
  update(position, value) {
    const node = this.find(position);
    node && node.change(value, 'value')
  }
  indexOf(value) {
    let current = this.head;
    let index = 0;
    while(current) {
      if (current.value === value) {
        return index
      }
      current = current.next;
      index++;
    } 
    return -1
  }
  parse() {
    let current = this.head;
    const values = [];
    while(current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
}

export default LinkList;
export { Node };