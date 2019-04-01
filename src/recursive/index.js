//线性递归求和
const sum = (arr, n = arr.length) => {
  if (n < 1) {
    return 0;
  } else {
    return sum(arr, n - 1) + arr[n - 1]
  }
}

const reverse = (arr, i = 0, j = arr.length - 1) => {
  if (i >= j) {
    return arr;
  } else {
    const iv = arr[i];
    const jv = arr[j];
    arr[i] = jv;
    arr[j] = iv;
    return reverse(arr, i + 1, j - 1);
  }
}

const reverse2 = (arr, i = 0, j = arr.length - 1) => {
  while(i < j) {
    const iv = arr[i];
    const jv = arr[j];
    arr[i] = jv;
    arr[j] = iv;
    i++; j--;
  }
  return arr;
}