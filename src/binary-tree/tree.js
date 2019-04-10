class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

//有序二叉树
export default class Tree {
  constructor(datas) {
    this.root = null;
    datas.forEach(d => {
      this.insert(d)
    })
  }
  _insert(current, newNode) {
    if (current.data > newNode.data) {
      if (current.left === null) {
        current.left = newNode
      } else {
        this._insert(current.left, newNode)
      }
    } else {
      if (current.right === null) {
        current.right = newNode
      } else {
        this._insert(current.right, newNode)
      }
    }
  }
  insert(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode
    } else {
      this._insert(this.root, newNode)
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
  search(data) {
    if (!this.root) {
      return
    }
    return this._search(this.root, data)
  }
  _search(node, data) {
    if (!node) {
      console.log('没有相应的值')
      return 
    }
    if (node.data === data) {
      return node
    }
    if (node.data > data) {
      return this._search(node.left, data)
    } else {
      return this._search(node.right, data)
    }
  }
}

