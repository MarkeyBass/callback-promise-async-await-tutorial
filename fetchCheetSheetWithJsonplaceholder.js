/**
 * JSON Placeholder API Guide:
 *  https://jsonplaceholder.typicode.com/guide/
 */

/**
 * GET User By ID Request
 * @param {number} id - The ID of the user to get
 * @returns {Promise<Object>} - The user object
 */
async function getUser(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
}

try {
  const user = await getUser(1);
  console.log(user);
} catch (error) {
  console.error(error);
}

/**
 * GET All Users Request
 * @returns {Promise<Object[]>} - The array of user objects
 */
async function getAllUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
}

try {
  const users = await getAllUsers();
  console.log(users);
} catch (error) {
  console.error(error);
}

/**
 * GET Request with Promise.all
 * @param {string[]} userUrls - The URLs of the users to get
 * @returns {Promise<Object[]>} - The array of user objects
 */
async function getUsers(userUrls) {
  const responses = await Promise.all(
    userUrls.map(async (url) => {
      const userRespone = await fetch(url);
      if (!userRespone.ok) {
        throw new Error(`HTTP error! status: ${userRespone.status}`);
      }
      return await userRespone.json();
    })
  );
  return responses;
}
try {
  const userUrls = [
    "https://jsonplaceholder.typicode.com/users/1",
    "https://jsonplaceholder.typicode.com/users/2",
  ];
  const users = await getUsers(userUrls);
  console.log(users);
} catch (error) {
  console.error(error);
}

/**
 * POST Request
 * @param {Object} user - The user object to create
 * @returns {Promise<Object>} - The created user object
 */
async function createUser(user) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}

try {
  const user = await createUser({ name: "Avi", role: "Student" });
  console.log(user);
} catch (error) {
  console.error(error);
}

/**
 * PUT Request
 * @param {number} id - The ID of the user to update
 * @param {Object} body - The user object to update
 * @returns {Promise<Object>} - The updated user object
 */
async function updateUser(id, body) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}

try {
  const userData = { name: "Avi", role: "Student" };
  const user = await updateUser(1, userData);
  console.log(user);
} catch (error) {
  console.error(error);
}

/**
 * DELETE Request
 * @param {number} id - The ID of the user to delete
 * @returns {Promise<Object>} - The response body (usually empty for DELETE)
 */
async function deleteUser(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}

try {
  const user = await deleteUser(1);
  console.log(user);
} catch (error) {
  console.error(error);
}

/**
 * GET posts by user ID with query params
 * @param {number} userId - The ID of the user to get posts for
 * @returns {Promise<Object[]>} - The array of post objects
 */
async function getPostsByUserId(userId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}
try {
  const posts = await getPostsByUserId(1);
  console.log(posts);
} catch (error) {
  console.error(error);
}
