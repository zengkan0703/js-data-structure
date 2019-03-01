import LoopLinkList from '../../index';

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
const ring = (n, m, k = 1) => {
  const a = new Date().getTime();
  if (n < 1 || m < 1 || k < 1) {
    console.error('输入不合法')
  }
  const numArr = Array.from({length: n}).map((a, i) => i + 1);
  const loop = new LoopLinkList(numArr);
  //根据 k 重置链表的头部
  const newHead = loop.find(k - 1);
  loop.head = newHead;
  while(loop.size > 1) {
    const node = getNodeByLoopIdx(loop, m);
    const idx = loop.indexOf(node.value);
    loop.delete(idx)
    //删除节点之后重置链表头部
    loop.head = node.next;
    // console.log('死的是：', node.value)
  }
  console.log('耗时：', new Date().getTime() - a);
  // console.log('最后活下来的是：', loop.head.value)
  return loop.head.value
}

//用数组实现
const ring2 = (n, m, k = 1) => {
  const a = new Date().getTime();
  if (n < 1 || m < 1 || k < 1) {
    console.error('输入不合法')
  }
  let numArr = Array.from({length: n}).map((a, i) => i + 1);
  numArr = numArr.slice(k - 1).concat(numArr.slice(0, k - 1))
  let i = 1;
  while(numArr.length > 1) {
    if (i === m) {
      // i 是从 1 开始计算，用在下标中要减 1
      const idx = (i - 1) % numArr.length;
      // console.log('死的是：', numArr[idx])
      numArr.splice(idx, 1);
      //把数组重新拼接 模拟链
      numArr = numArr.slice(idx).concat(numArr.slice(0, idx))
      i = 1
    } else {
      i ++
    }
  }

  console.log('耗时：', new Date().getTime() - a);
  // console.log('最后活下来的是：', numArr[0])
  return numArr[0]
}

const ring3 = (n, m, k = 1) => {
  const a = new Date().getTime();
  if (n < 1 || m < 1 || k < 1) {
    console.error('输入不合法')
  }
  const numArr = Array.from({length: n}).map((a, i) => i + 1);
  let i = k - 1;
  while (numArr.length > 1) {
    i = (i + m -1) % numArr.length;
    // console.log('死的是：',numArr[i]);
    numArr.splice(i, 1)
  }
  // console.log('最后活下来的是：', numArr[0])
  console.log('耗时：', new Date().getTime() - a);
  return numArr[0]
}

export {
  ring, ring2, ring3
}