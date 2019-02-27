import LoopLinkList from '../loop-link-list';

// 根据循环次数拿相对应的节点，循环次数从 1 开始
const getNodeByLoopIdx = (loop, loopIdx) => {
  let current = loop.head;
  let i = 1;
  while(i < loopIdx) {
    current = current.next
    i ++;
  }
  return current
}
/**
 * 
 * @param {*} n n 个人
 * @param {*} k 从第 k 个人开始数
 * @param {*} m 第 m 个出列
 */
const ring = (n, k, m) => {
  const numArr = Array.from({length: n}).map((a, i) => i + 1);
  const loop = new LoopLinkList(numArr);
  //根据 k 重置链表的头部
  const newHead = loop.find(k - 1);
  loop.head = newHead;
  while(loop.head.next !== loop.head) {
    const node = getNodeByLoopIdx(loop, m);
    const idx = loop.indexOf(node.value);
    loop.delete(idx)
    //删除节点之后重置链表头部
    loop.head = node.next;
    console.log('死的是：', node.value)
  }
  console.log('最后活下来的是：', loop.head.value)
}

export default ring;