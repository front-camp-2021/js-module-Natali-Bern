export const cutStrings = (arr = []) => {
  // Шукаємо найкоротший рядок в масиві

  if (arr.length == 0) {
    return arr;
  }

  let minLen = arr[0].length;

  for(let i=1; i<arr.length; i++){
    if(arr[i].length < minLen) {
      minLen = arr[i].length;
    }
  }

  let res = arr.map(function(item) {
    return item.substring(0,minLen);
  });

  return res;
};
