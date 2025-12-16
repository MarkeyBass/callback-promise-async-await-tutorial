// function fetchUser(userId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const user = { id: userId, name: "John Doe" };
//       resolve(user);
//     }, 1000);
//   });
// }

// function fetchPosts(userId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const posts = [
//         { id: 1, userId: userId, title: "My First Post" },
//         { id: 2, userId: userId, title: "My Second Post" }
//       ];
//       resolve(posts);
//     }, 1000);
//   });
// }

// function fetchComments(postId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const comments = [
//         { id: 1, postId: postId, text: "Great post!" },
//         { id: 2, postId: postId, text: "Thanks for sharing!" }
//       ];
//       resolve(comments);
//     }, 1000);
//   });
// }

// async function getFullData() {
//   try {
//     const user = await fetchUser(1);
//     const posts = await fetchPosts(user.id);
//     const comments = await fetchComments(posts[0].id);
//     return { user, posts, comments };
//   } catch (error) {
//     console.error("Error occurred:", error);
//   }
// }

// const data = await getFullData();
// console.log(data);

// fetchUser(1)
//   .then((user) => fetchPosts(user.id)
//   .then((posts) => fetchComments(posts[0].id))
//   .then((comments) => console.log(comments)))
//   .catch((error) => console.log(error));

// const url = "https://swapi.dev/api/people/1/";

// fetch(url)
//   .then((response) => {
//     // TODO: check response.ok and maybe throw an Error
//     return response.json();
//   })
//   .then((data) => {
//     console.log("PERSON",data);
//     return fetch(data.films[0]);
//   })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => console.log("FILM",data))
//   .catch((error) => {
//     console.log(error);
//   });

// // Same promise function from before
// function fetchUser(userId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (userId < 1 || !userId) reject(new Error("id not valid"));
//       const user = { id: userId, name: "John Doe", email: "john@example.com" };
//       resolve(user);
//     }, 1000);
//   });
// }

// // Using async/await
// async function getUser() {
//   const user = await fetchUser(-1);
//   return user;
// }
// try {
//   const user = await getUser();
//   console.log("======================")
//   console.log("fetched user: ", user);
// } catch (err) {
//   console.log("Error:::::::::::: ", err);
// }

// try {
//   const user = await fetchUser(0);
//   console.log(user);
// } catch (err) {
//   console.log("Check your code!!!!");
// }

// function fetchUser(userId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (userId < 1 || !userId) reject(new Error("id not valid"));
//       const user = { id: userId, name: "John Doe", email: "john@example.com" };
//       resolve(user);
//     }, 1000);
//   });
// }

// // Using async/await
// async function getUser() {
//   const user = await fetchUser(1);
//   return user;
// }
// try {
//   const user = await getUser();
//   console.log("fetched user: ", user);
// } catch (err) {
//   console.log("Error: ", err);
// }

// function fetchUser(userId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const user = { id: userId, name: "John Doe" };
//       resolve(user);
//     }, 1000);
//   });
// }
// function fetchUser2(userId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const user = { id: userId, name: "John Doe 2ß" };
//       resolve(user);
//     }, 2000);
//   });
// }

// async function getMultipleUsers() {
//   try {
//     // These will run in parallel!
//     const [user1, user2, user3] = await Promise.all([fetchUser(1), fetchUser2(2), fetchUser(3)]);

//     console.log("All users:", user1, user2, user3);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// // getMultipleUsers();
// const url = "https://app.cicadamusic.net/api/v1/concerts/123"
// async function getJson(url) {
//   const response = await fetch(url);

//   // console.log(response);
//   if (!response.ok) {
//     console.log("response.ok", response.ok);
//     console.log("response.satatus", response.status);

//     // throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   const data = await response.json();
//   return data;
// }

// // try {
//   const luck = await getJson(url)
//   console.log(luck)
// // } catch (err) {
// //   console.log(err)
// // }
// const myUser = { name: "Avi", role: "Student", abc: null }
// const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(myUser),
// });
// console.log(res.status)
// const data = await res.json();
// console.log(data);

// const myTasks = [
//   "https://jsonplaceholder.typicode.com/todos/1",
//   "https://jsonplaceholder.typicode.com/todos/2",
// ];

// Promise.all(
//   myTasks.map((taskUrl) => {
//     fetch(taskUrl)
//       .then((res) => res.json())
//       .then((data) => console.log(data));
//   })
// );
