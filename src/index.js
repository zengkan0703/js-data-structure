import LoopLinkList from './loop-link-list/index';
import LinkList from './link-list';
import { ring, ring2, ring3 } from './joseph-ring';
import Stack from './stack';
import { baseConverter } from './stack/example';

window.LinkList = LinkList
window.LoopLinkList = LoopLinkList;
window.ring = ring;
window.ring2 = ring2;
window.ring3 = ring3;
window.Stack = Stack;

baseConverter(15, 16)