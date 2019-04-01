class Queen {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  isEqual(queen) {
    return (
      this.x === queen.x ||
      this.y === queen.y ||
      this.x + this.y === queen.x + queen.y ||
      this.x - this.y === queen.x - queen.y
    )
  }
}

// export default function NQueen (n) {
//   const queenStack = [];
//   queenStack.push(new Queen(0, 0));
//   let y = 0;
//   while(queenStack.length < n && queenStack.length && queenStack[0].y < n) {
//     const lastQueen = queenStack[queenStack.length - 1];
//     let newQueen = new Queen(lastQueen.x + 1, y);
//     let success = false;
//     while (newQueen.y < n) {
//       if (newQueen.x ===3 && newQueen.y === 2) {
//         debugger
//       }
//       if (queenStack.find(d => d.isEqual(newQueen))) {
//         if (newQueen.y >= n-1) {
//           break;
//         } else {
//           newQueen.y++;
//         }
//       } else {
//         queenStack.push(newQueen);
//         success = true;
//         break;
//       }
//     }
//     if (!success) {
//       let l = queenStack.pop();
//       while (l.y >= n && queenStack.length) {
//         l = queenStack.pop();
//         l.y++
//       }
//       y++
//     }
//   }
//   console.log(queenStack, 'queenStack 555555')
// }

export default function NQueen (n) {
  const stack = [];
  let current = new Queen(0, 0);
  let i = 0
  while(stack.length < n || current.y < n) {
    if (current.y >= n) {
      //回溯
      if (!stack.length) {
        break;
      }
      current = stack.pop();
      current.y ++;
    } else {
      while (stack.find(d => d.isEqual(current))) {
        current.y ++;
        await this.updateCurrent(current)
        i ++
      }
      if (current.y < n) {
        stack.push(current)
        current = new Queen(current.x + 1, 0)
      }
    }
  }
  console.log(i)
}


window.NQueen = NQueen
