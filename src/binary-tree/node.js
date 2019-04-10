export default class Node {
  constructor(data, parent = null, lChild = null, rChild = null) {
    this.parent = parent;
    this.lChild = lChild;
    this.rChild = rChild;
    this.data = data;
  }
  _setParent(ele, parent) {
    let node = ele
    if (node instanceof Node) {
      node.parent = parent;
    } else if(ele) {
      node = new Node(ele, parent)
    }
    return node
  }
  insertAsLc(node) {
    node = this._setParent(node, this);
    this.lChild = node;
  }
  insertAsRc(node) {
    node = this._setParent(node, this);
    this.rChild = node;
  }
  isRoot() {
    return !!this.parent
  }
  isLeaf() {
    return !!(this.lChild && this.rChild)
  }
  height() {
    let node = this;
    let height = 0;
    while(node) {
      height ++;
      node = node.lChild || node.rChild
    }
    return height;
  }
}
