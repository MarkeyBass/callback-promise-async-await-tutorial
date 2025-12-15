## SWAPI Fetch Practice – Async/Await Edition 🚀

These exercises will help you practice **GET requests to [SWAPI](https://swapi.dev/)** using **`fetch` with `async` / `await`**.

- Base URL: `https://swapi.dev/api/`
- Example endpoints:
  - `https://swapi.dev/api/people/1/`
  - `https://swapi.dev/api/planets/3/`
  - `https://swapi.dev/api/starships/9/`

For every exercise:
- Use **`async` functions and `await fetch(...)`**.
- Wrap your logic in **`try` / `catch`** blocks.
- Always check **`response.ok`** and throw helpful errors on failure.

---

## 0. Pattern Reminder: Async/Await with Fetch

Here’s the basic pattern you’ll use over and over:

```javascript
async function getJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
```

You’ll implement this pattern (or something similar) in each exercise.

---

## 1. Fetch Luke Skywalker with Async/Await (Warmup)

**Goal:**  
Create an `async` function that fetches **Luke Skywalker** (`people/1`) and logs his **name** and **height**.

**Endpoint:**  
`https://swapi.dev/api/people/1/`

**Requirements:**
- Create a function `async function fetchLuke() { ... }`
- Inside:
  - Use `await fetch(...)`
  - Check `response.ok`
  - `await response.json()`
  - Log:
    - `"Name: <name>"`
    - `"Height: <height>"`
- Wrap the body in `try` / `catch` and log any error message.

**Starter skeleton:**

```javascript
async function fetchLuke() {
  try {
    const url = "https://swapi.dev/api/people/1/";

    // TODO: await fetch
    // TODO: check response.ok
    // TODO: await response.json()
    // TODO: log name and height
  } catch (error) {
    console.error("Error fetching Luke:", error);
  }
}

fetchLuke();
```

---

## 2. Reusable Helper: `getJson(url)`

**Goal:**  
Create a reusable helper `getJson(url)` that:
- Uses `fetch` + `await`
- Checks `response.ok`
- Returns the parsed JSON
- Throws an `Error` if the HTTP status is not OK

**Requirements:**

```javascript
async function getJson(url) {
  // TODO: use fetch + await
  // TODO: check response.ok
  // TODO: parse and return JSON
}
```

Then:
- Use `getJson("https://swapi.dev/api/people/1/")` inside an `async` function to:
  - Log the person’s name
  - Handle errors with `try` / `catch`.

**Hint:**  
This helper is similar to the pattern shown in section 0 and will be useful for later exercises.

---

## 3. Get Any Person by ID

**Goal:**  
Create `async function getPerson(id)` that returns a **person object** from SWAPI using `await getJson(...)`.

**Endpoint pattern:**  
`https://swapi.dev/api/people/<id>/`

**Requirements:**

```javascript
async function getPerson(id) {
  const url = `https://swapi.dev/api/people/${id}/`;
  // TODO: call getJson(url) and return the result
}
```

Then create another `async` function `showPerson(id)` that:
- Calls `await getPerson(id)`
- Logs:
  - `"Name: <name>"`
  - `"Birth year: <birth_year>"`
- Wraps everything in `try` / `catch` and logs any errors.

**Bonus:**
- Call `showPerson(1)` (valid)
- Call `showPerson(9999)` (likely invalid) and confirm your error handling works.

---

## 4. Fetch a Planet and Show Details

**Goal:**  
Fetch a **planet** using async/await and log some key planet details.

**Endpoint:**  
`https://swapi.dev/api/planets/3/`

**Requirements:**
- Write `async function showPlanet(id)` that:
  - Builds the URL: ``https://swapi.dev/api/planets/${id}/``
  - Uses `await getJson(url)`
  - Logs:
    - `"Name: <name>"`
    - `"Climate: <climate>"`
    - `"Population: <population>"`
- Wrap in `try` / `catch`.

Example usage:

```javascript
showPlanet(3);
```

---

## 5. Chaining with Async/Await: Person → Homeworld

**Goal:**  
Use async/await to:
1. Fetch a person
2. Then fetch their **homeworld** based on the URL in the person data

**Steps:**
1. Use `getPerson(id)` from exercise 3.
2. Read `person.homeworld` (this is a full URL).
3. Use `await getJson(person.homeworld)` to fetch the planet.
4. Log:
   - `"Person: <person.name>"`
   - `"Homeworld: <planet.name>"`

**Requirements:**

```javascript
async function showPersonAndHomeworld(id) {
  try {
    const person = await getPerson(id);
    const homeworld = await getJson(person.homeworld);

    console.log(`Person: ${person.name}`);
    console.log(`Homeworld: ${homeworld.name}`);
  } catch (error) {
    console.error("Error in showPersonAndHomeworld:", error.message);
  }
}

showPersonAndHomeworld(1);
```

Try implementing it yourself before looking at the example structure above.

---

## 6. Multiple Requests in Parallel: `Promise.all` + Async/Await

**Goal:**  
Use `Promise.all` with `async/await` to fetch **three people at the same time** and log their names.

**People to fetch:**
- `people/1/`
- `people/2/`
- `people/3/`

**Requirements:**

```javascript
async function showMultiplePeople() {
  try {
    const urls = [
      "https://swapi.dev/api/people/1/",
      "https://swapi.dev/api/people/2/",
      "https://swapi.dev/api/people/3/",
    ];

    // 1. Create an array of promises using getJson(url)
    const promises = urls.map(url => getJson(url));

    // 2. Await Promise.all(promises)
    const people = await Promise.all(promises);

    // 3. Log their names
    people.forEach(person => {
      console.log(person.name);
    });
  } catch (error) {
    console.error("Error fetching multiple people:", error.message);
  }
}

showMultiplePeople();
```

Try to write this function yourself first, then compare to the example.

---

## 7. Starship Lookup with Custom Errors

**Goal:**  
Create `async function getStarship(id)` that:
- Fetches a starship by ID
- Throws a **custom `Error`** if:
  - The HTTP status is 404 (e.g., “Starship not found”)
  - Or `response.ok` is false for any other reason

**Endpoint pattern:**  
`https://swapi.dev/api/starships/<id>/`

**Requirements (without using `getJson` this time, to practice error handling inline):**

```javascript
async function getStarship(id) {
  const url = `https://swapi.dev/api/starships/${id}/`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Starship with ID ${id} not found (404).`);
    }
    throw new Error(`Failed to fetch starship. Status: ${response.status}`);
  }

  const starship = await response.json();
  return starship;
}
```

Then write:

```javascript
async function showStarship(id) {
  try {
    const starship = await getStarship(id);
    console.log(`Starship: ${starship.name}`);
    console.log(`Model: ${starship.model}`);
    console.log(`Manufacturer: ${starship.manufacturer}`);
  } catch (error) {
    console.error("Error in showStarship:", error.message);
  }
}

showStarship(9);    // valid-ish ID
showStarship(9999); // to test your error path
```

---

## 8. Person → Homeworld → First Film

**Goal:**  
Build a slightly longer async chain:
1. Fetch a person
2. Fetch their homeworld
3. Fetch their **first film** (from the `films` array in the person)

**Steps:**
- Use `getPerson(id)` to get the person.
- From the person:
  - `homeworld` (URL)
  - `films[0]` (URL of first film)
- Use `await getJson` on both URLs.
- Log something like:

```text
<person.name> is from <planet.name> and first appeared in "<film.title>"
```

**Skeleton:**

```javascript
async function showPersonHomeworldAndFirstFilm(id) {
  try {
    const person = await getPerson(id);

    const homeworldPromise = getJson(person.homeworld);
    const firstFilmUrl = person.films[0];
    const firstFilmPromise = getJson(firstFilmUrl);

    // Run both in parallel:
    const [homeworld, firstFilm] = await Promise.all([
      homeworldPromise,
      firstFilmPromise,
    ]);

    console.log(
      `${person.name} is from ${homeworld.name} and first appeared in "${firstFilm.title}".`
    );
  } catch (error) {
    console.error("Error in showPersonHomeworldAndFirstFilm:", error.message);
  }
}

showPersonHomeworldAndFirstFilm(1);
```

Try to implement this yourself, focusing on:
- Combining `await` with `Promise.all`
- Keeping your try/catch around the whole flow.

---

## 9. Build a Small Async SWAPI Client

**Goal:**  
Create a small “client” module that exposes a few async functions, all using `fetch` + `await` + good error handling.

In a file like `swapiClientAsync.js`, implement:

```javascript
async function getJson(url) { ... } // from exercise 2

async function getPerson(id) { ... }

async function getPlanet(id) { ... }

async function getStarship(id) { ... }

async function searchPeople(query) {
  const url = `https://swapi.dev/api/people/?search=${encodeURIComponent(query)}`;
  return getJson(url);
}
```

Then in another file (e.g. `demoAsync.js`), write some demo code:
- `showPerson(1)`
- `showPersonAndHomeworld(1)`
- `showPersonHomeworldAndFirstFilm(1)`
- `searchPeople("skywalker")` and log the list of matching names.

Make sure every public function:
- Uses `async` / `await`
- Throws clear `Error`s when something goes wrong
- Is wrapped by higher-level functions that log or re-throw errors appropriately.

---

## Tips & Good Practices

- **Always** use `try` / `catch` around `await` chains that touch the network.
- Centralize common patterns in helpers like `getJson(url)` to avoid repeating error-checking logic.
- Use **descriptive function names**: `showPersonAndHomeworld`, `getStarship`, `searchPeople`, etc.
- When you have multiple independent requests, consider `Promise.all` to run them in parallel.
- Combine what you learned about async/await here with the concurrency concepts from FastAPI’s async docs (e.g., overlapping I/O-bound work, like multiple HTTP requests) for a deeper understanding of how async flows work under the hood ([FastAPI async docs](https://fastapi.tiangolo.com/async/#concurrency-and-burgers)).

Happy async coding! ✨


