import fs from "fs";

// Write to file with callback
fs.readFile("user.json", "utf8", (error, data) => {
  if (error) {
    console.log({
      error, data
    })
  } else {
    console.log({
      error, data
    })
  }
});

console.log("This runs immediately, before file is created");


// // For error handling eample:
// // ==========================
// // Write to file with callback
// fs.readFile("user1.json", "utf8", (error, data) => {
//   if (error) {
//     console.log("File content:", error);
//     console.log({
//       error, data
//     })
//   } else {
//     console.log("File content:", data);
//     console.log({
//       error, data
//     })
//   }
// });

// console.log("This runs immediately, before file is created");
