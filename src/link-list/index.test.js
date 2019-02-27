import LinkList from './index';

describe('链表', () => {
  const list1 = new LinkList([1,2,3]);
  test('indexOf', () => {
    expect(list1.indexOf(3)).toBe(2);
  })
  test('append', () => {
    list1.append(4);
    expect(list1.parse()).toEqual([1,2,3,4])
  })
  test('delete', () => {
    list1.delete(0);
    list1.delete(5);
    expect(list1.parse()).toEqual([2,3,4])
  })
  test('insert', () => {
    list1.insert(0, 5);
    list1.insert(10, 10);
    list1.insert(2, 6);
    expect(list1.parse()).toEqual([5,2,6,3,4])
  })
  test('update', () => {
    list1.update(2, '我是第三个');
    expect(list1.parse()).toEqual([5,2,'我是第三个',3,4])
  })
})
