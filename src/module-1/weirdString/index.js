export const weirdString = (str = "") => {
  const res = [];
	const arr = str.split(" ");
	for (let i = 0; i < arr.length; i++) {
		const start = arr[i].slice(0, -1);
		const fin = arr[i].slice(-1)
		res.push(start.toUpperCase() + fin.toLowerCase());
	}
	return res.join(" ");

};
