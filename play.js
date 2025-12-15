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

const url = "https://swapi.dev/api/people/1/";

fetch(url)
  .then((response) => {
    // TODO: check response.ok and maybe throw an Error
    return response.json();
  })
  .then((data) => {
    console.log("PERSON",data);
    return fetch(data.films[0]);
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => console.log("FILM",data))
  .catch((error) => {
    console.log(error);
  });
