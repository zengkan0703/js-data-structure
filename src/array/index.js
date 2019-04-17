//数组去重
//时间复杂度 n * (n + 2) = O(n^2)
const deduplicate = (arr) => {
  return arr.reduce((p, n) => {
    if (!p.find(a => a === n)) {
      p.push(n);
    }
    return p;
  }, [])
}


//有序数组去重
//时间复杂度  n * 3 = O(n)
const deduplicate2 = (arr) => {
  return arr.reduce((p, n, i) => {
    if (i > 0 && n !== arr[i - 1]) {
      p.push(n);
    }
    return p;
  }, [arr[0]])
}