// function getNumbers(numbers) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (numbers.length === 0) {
//         reject(new Error("No numbers provided"));
//         return;
//       }
//       resolve(numbers);
//     }, 1000);
//   });
// }

// getNumbers([])
//   .then((data) =>
//     data.forEach((number) => {
//       console.log(number);
//     })
//   )
//   .catch((error) => console.error(error));

fetch("https://swapi.dev/api/people/3")
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.error("You have an error\n", err));

console.log("my first message")