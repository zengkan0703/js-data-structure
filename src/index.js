import Stack from './stack';
import { baseConverter, bracketBalance } from './stack/example';

window.Stack = Stack;
window.bracketBalance = bracketBalance;

baseConverter(15, 16)