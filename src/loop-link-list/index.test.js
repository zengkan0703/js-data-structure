import LoopLinkList from './index.js';

describe('循环链表', () => {
  test('append', () => {
    const loop = new LoopLinkList();
    loop.append(1);
    loop.append(5);
    expect(loop.parse()).toEqual([1, 5]);
  })
  test('delete', () => {
    const loop = new LoopLinkList([1,2,3,4,5]);
    loop.delete(1);
    loop.delete(5);
    loop.delete(3);
    loop.delete(0);
    expect(loop.parse()).toEqual([3,4]);
  })
  test('综合', () => {
    const loop = new LoopLinkList([1,2,3]);
    loop.append(4);
    loop.delete(0);
    loop.append(5);
    loop.delete(3);
    expect(loop.parse()).toEqual([2,3,4]);
  })
})