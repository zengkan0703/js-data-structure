import LinkList from './index';

test('链表', () => {
  const list1 = new LinkList([1,2,3]);
  expect(list1.indexOf(3)).toBe(2);
})