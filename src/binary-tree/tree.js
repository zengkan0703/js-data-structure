class Node {
  constructor(value, left = null, right = null, parent = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.height = 1;
    this.size = 1;
    this.level = 1;
    this.rightSize = 0;
    this.leftSize = 0;
  }
}

new Array(10).fill().map(d => parseInt(Math.random() * 100))

//有序二叉树
export default class Tree {
  constructor(values) {
    this.root = null;
    values && [...new Set(values)].forEach(d => {
      this.insert(d)
    })
  }
  insert(value) {
    if (this.search(value)) {
      console.log('重复');
      return;
    }
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this.root;
    } else {
      return this._insert(this.root, newNode)
    }
  }
  _insert(current, newNode) {
    if (current.value > newNode.value) {
      if (current.left === null) {
        newNode.parent = current;
        newNode.level = current.level + 1;
        current.left = newNode;
        this._updateHeight(newNode);
        this._updateSize(newNode);
        return newNode;
      } else {
        return this._insert(current.left, newNode)
      }
    } else {
      if (current.right === null) {
        newNode.parent = current;
        newNode.level = current.level + 1;
        current.right = newNode;
        this._updateHeight(newNode);
        this._updateSize(newNode);
        return newNode;
      } else {
        return this._insert(current.right, newNode)
      }
    }
  }
  //递归更新上级树高度
  _updateHeight(node) {
    while(node.parent) {
      const parent = node.parent;
      const left = parent.left;
      const right = parent.right;
      const leftHeight = left ? left.height : 0;
      const rightHeight = right ? right.height : 0;
      const height = Math.max(leftHeight, rightHeight) + 1;
      if (height === parent.height) {
        break;
      }
      parent.height = height;
      node = parent;
    }
  }
  _updateSize(node) {
    while(node.parent) {
      const parent = node.parent;
      const left = parent.left;
      const right = parent.right;
      const leftSize = left ? left.size : 0;
      const rightSize = right ? right.size : 0;
      const size = leftSize + rightSize + 1;
      if (size === parent.size) {
        break;
      }
      parent.size = size;
      parent.leftSize = leftSize;
      parent.rightSize = rightSize;
      node = parent;
    }
  }
  //删除子树
  remove(value) {
    const node = this.search(value);
    const { parent } = node;
    if (parent) {
      if (parent.value >= node.value) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      this._updateHeight(parent.left || parent.right);
      this._updateSize(parent.left || parent.right);
    } else {
      this.root = null;
    }
  }
  //先序遍历
  travPre(callback) {
    this._travPre(this.root, callback)
  }
  _travPre(node, callback) {
    if (!node) {
      return;
    }
    callback(node);
    this._travPre(node.left, callback);
    this._travPre(node.right, callback);
  }
  //中序遍历
  travIn(callback) {
    this._travIn(this.root, callback)
  }
  _travIn(node, callback) {
    if (!node) {
      return;
    }
    this._travIn(node.left, callback);
    callback(node);
    this._travIn(node.right, callback);
  }
  //后序遍历
  travPost(callback) {
    this._travPost(this.root, callback)
  }
  _travPost(node, callback) {
    if (!node) {
      return;
    }
    this._travPost(node.left, callback);
    this._travPost(node.right, callback);
    callback(node);
  }
  //层次遍历
  travLevel(callback) {
    if (!this.root) {
      return;
    }
    let arr = [];
    let i = 0;
    arr.push(this.root);
    while(arr.length) {
      callback(arr, i)
      const newArr = [];
      arr.map(n => {
        n.left && newArr.push(n.left);
        n.right && newArr.push(n.right);
      })
      arr = newArr;
      i ++
    }
  }
  //查找最小值
  findMin() {
    if (!this.root) {
      return
    }
    let node = this.root;
    while(true) {
      if (!node.left) {
        return node
      }
      node = node.left
    }
  }
  //查找最大值
  findMax() {
    if (!this.root) {
      return
    }
    let node = this.root;
    while(true) {
      if (!node.right) {
        return node
      }
      node = node.right
    }
  }
  //根据值查找节点
  search(value) {
    if (!this.root) {
      return
    }
    return this._search(this.root, value)
  }
  _search(node, value) {
    if (!node) {
      console.log('没有相应的值')
      return null;
    }
    if (node.value === value) {
      return node
    }
    if (node.value > value) {
      return this._search(node.left, value)
    } else {
      return this._search(node.right, value)
    }
  }
  //查找所有页节点
  getLeaves() {
    const leaves = [];
    this.travPre(d => {
      if (!d.right && !d.left) {
        leaves.push(d)
      }
    }) 
    return leaves;
  }
  getBySth(key, value) {
    const nodes = [];
    this.travPre(d => {
      if (d[key] === value) {
        nodes.push(d)
      }
    }) 
    return nodes;
  }
}

