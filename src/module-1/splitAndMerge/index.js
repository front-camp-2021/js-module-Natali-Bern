export const splitAndMerge = (str = "", separator = "") => {
  let res = [];
  let inArr = str.split(" ");
  inArr.forEach(item =>{
    let word = item.split("").join(`${separator}`);
    res.push(word);
  });

  return res.join(" ");

};
