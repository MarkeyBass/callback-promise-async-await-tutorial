function getNumbers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5]);
    }, 700);
  });
}

getNumbers().then((resolve) =>
  resolve.forEach((number) => console.log(number))
);