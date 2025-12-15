## SWAPI Fetch Practice – Promises Only 🛰️

These exercises will help you practice making **GET requests with `fetch` using Promises only** (no `async/await`), using the public **Star Wars API**: [SWAPI](https://swapi.dev/).

- Base URL: `https://swapi.dev/api/`
- Try endpoints like:
  - `https://swapi.dev/api/people/1/`
  - `https://swapi.dev/api/planets/3/`
  - `https://swapi.dev/api/starships/9/`

For every exercise:
- Use **`fetch(...).then(...).catch(...)` only**.
- Don’t use `async` / `await`.
- Always handle **errors** (e.g., network issues, bad status codes).

---

## 1. Fetch Luke Skywalker (Warmup)

**Goal:**  
Use `fetch` to get **Luke Skywalker** (people/1) and log his **name** and **height**.

**Endpoint:**  
`https://swapi.dev/api/people/1/`

**Requirements:**
- Use `fetch(url)` and `.then()` to:
  - Check `response.ok`
  - Call `response.json()`
- Log:  
  - `"Name: <name>"`  
  - `"Height: <height>"`
- If there is an error (network or non-OK status), log:  
  - `"Error fetching Luke:"` and the error.

**Starter skeleton (you fill in the blanks):**

```javascript
const url = "https://swapi.dev/api/people/1/";

fetch(url)
  .then(response => {
    // TODO: check response.ok and maybe throw an Error
    // TODO: return response.json();
  })
  .then(data => {
    // TODO: log Luke's name and height
  })
  .catch(error => {
    // TODO: log a helpful error message
  });
```

---

## 2. Fetch Any Person by ID (Reusable Function)

**Goal:**  
Create a function `getPerson(id)` that returns a **Promise** which resolves with the person data from SWAPI.

**Endpoint pattern:**  
`https://swapi.dev/api/people/<id>/`

**Requirements:**
- Implement:

```javascript
function getPerson(id) {
  // return a Promise from fetch
}
```

- Inside `getPerson`:
  - Use `fetch`
  - Check `response.ok`
  - Return `response.json()` (so the promise resolves with the parsed data)
- Outside the function:
  - Call `getPerson(1)` and log the person’s `name`
  - Add `.catch(...)` to handle errors

**Bonus:**
- Call `getPerson(9999)` (an ID that probably doesn’t exist) and see what happens.
- Adjust your code to **throw an error** when `response.ok` is false so `.catch` runs.

---

## 3. Fetch a Planet and Log Key Info

**Goal:**  
Fetch a **planet** and log some key information.

**Endpoint:**  
`https://swapi.dev/api/planets/3/`

**Requirements:**
- Fetch the planet
- Log:
  - `"Name: <name>"`
  - `"Climate: <climate>"`
  - `"Population: <population>"`
- Handle errors with `.catch`.

**Hint:**  
Planet 3 is often **Yavin IV** – but don’t hard-code the name; read it from the response.

---

## 4. Chain Promises: Person → Homeworld

**Goal:**  
Use a **promise chain** (no `async/await`) to:
1. Fetch a person
2. Then fetch their **homeworld** using the `homeworld` URL from the first response

**Steps:**
1. Fetch `https://swapi.dev/api/people/1/`
2. In the `.then(data => { ... })`:
   - Log the person’s name
   - Return `fetch(data.homeworld)`  
     (this starts the second request)
3. In the next `.then(response => { ... })`:
   - Convert to JSON
4. In the next `.then(homeworld => { ... })`:
   - Log `"Homeworld: <homeworld name>"`
5. Add `.catch` at the end to handle any error in the chain.

**Structure hint:**

```javascript
fetch("https://swapi.dev/api/people/1/")
  .then(response => {
    // check response.ok
    return response.json();
  })
  .then(person => {
    console.log("Person:", person.name);
    // IMPORTANT: return the fetch so the chain waits for it
    return fetch(person.homeworld);
  })
  .then(response => {
    // check response.ok
    return response.json();
  })
  .then(homeworld => {
    console.log("Homeworld:", homeworld.name);
  })
  .catch(error => {
    console.error("Error in person → homeworld chain:", error);
  });
```

Try to write this yourself before looking back at the hint.

---

## 5. Multiple Requests in Parallel: Fetch 3 People

**Goal:**  
Use **`Promise.all`** with `fetch` to get **three people at once**, then log all their names.

**People to fetch:**
- `people/1/`
- `people/2/`
- `people/3/`

**Steps:**
1. Create three `fetch` calls:

```javascript
const p1 = fetch("https://swapi.dev/api/people/1/");
const p2 = fetch("https://swapi.dev/api/people/2/");
const p3 = fetch("https://swapi.dev/api/people/3/");
```

2. Use `Promise.all([p1, p2, p3])`
3. In the `.then`, you get an array of responses – convert each to JSON:
   - Tip: `return Promise.all(responses.map(r => r.json()));`
4. In the next `.then`, you get an array of data:
   - Log each person’s name
5. Use `.catch` at the end to handle any error (if any of the requests fail).

---

## 6. Starship Search by ID (with Manual Error Handling)

**Goal:**  
Write a function `getStarship(id)` that:
- Returns a **Promise**
- Resolves with the starship data if found
- **Rejects** with a custom `Error` if:
  - The response status is **404**, or
  - `response.ok` is false for any other reason

**Endpoint pattern:**  
`https://swapi.dev/api/starships/<id>/`

**Requirements:**

```javascript
function getStarship(id) {
  const url = `https://swapi.dev/api/starships/${id}/`;

  return fetch(url)
    .then(response => {
      // If not OK, throw your own Error with a helpful message
      // Otherwise, return response.json()
    });
}
```

Usage examples:

```javascript
getStarship(9)
  .then(starship => {
    console.log("Starship:", starship.name);
  })
  .catch(error => {
    console.error("Could not get starship:", error.message);
  });

// Try an invalid ID to see your error handling
getStarship(9999)
  .then(starship => {
    console.log("Starship:", starship.name);
  })
  .catch(error => {
    console.error("Expected error:", error.message);
  });
```

---

## 7. Chaining with Reusable Functions

**Goal:**  
Split your logic into **reusable, promise-based functions** and chain them:

- `getPerson(id)` → returns a Promise of person data
- `getPlanetByUrl(url)` → returns a Promise of planet data for a given URL

Then:
1. Call `getPerson(1)`
2. Log the person’s name
3. Use the `homeworld` URL from the person to call `getPlanetByUrl`
4. Log the homeworld’s name and population
5. Catch and log any errors.

**Stretch goal:**  
Add another function:

```javascript
function getFilmTitles(urls) {
  // urls: array of film URLs
  // return a Promise that resolves with an array of film titles
}
```

Then extend your chain to:
- Fetch the person
- Fetch their homeworld
- Fetch all their films (using `getFilmTitles`)
- Log everything in a nice summary.

---

## 8. Practice: Build Your Own Small “API Client” Module

**Goal:**  
Create a small file (e.g. `swapiClient.js`) that exports only **promise-based** functions using `fetch`:

- `getPerson(id)`
- `getPlanet(id)`
- `getStarship(id)`
- `searchPeople(query)` – use `https://swapi.dev/api/people/?search=<query>`

Each function should:
- Return a **Promise**
- Use `fetch`
- Check `response.ok`
- Convert to JSON with `.then(...)`
- Reject with a helpful `Error` when something goes wrong

Then create another file (e.g. `demo.js`) that:
- Imports those functions (or just copies them if you’re not using modules yet)
- Demonstrates:
  - A simple chain (person → homeworld)
  - A `Promise.all` example (3 people at once)
  - A `.catch` that logs errors in a user-friendly way

---

## Tips & Reminders

- **Always return Promises from your functions** when working with `fetch` and `.then`.
- **Always end long chains with `.catch`** to handle unexpected errors.
- Remember:  
  - `fetch` **only rejects** on network errors by default  
  - HTTP errors like **404** or **500** do **not** automatically reject  
  - That’s why you should check `response.ok` and `throw` your own `Error` when needed.
- Keep your code readable by:
  - Splitting logic into small functions
  - Giving variables clear names (`person`, `planet`, `homeworld`, etc.)

If you want to explore more endpoints or fields, check the official docs: [SWAPI](https://swapi.dev/).


