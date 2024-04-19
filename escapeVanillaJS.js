document.addEventListener("DOMContentLoaded", () => {
  //ROOM ONE
  document.getElementById("solveRoom1").addEventListener("click", () => {
    fetch("books.json")
      .then((response) => response.json())
      .then((books) => {
        const mostRecentBook = findMostRecentBook(books);
        document.getElementById(
          "room1Result"
        ).textContent = `The key to the next room is: ${mostRecentBook.title}`;
      });
  });

  //ROOM TWO:
  document.getElementById("solveRoom2").addEventListener("click", () => {
    const jsConcepts = new Set(["closure", "async", "scope", "hoisting"]);

    const reactConcepts = new Set(["components", "jsx", "hooks", "async"]);

    const commonConcepts = findIntersection(jsConcepts, reactConcepts);
    document.getElementById(
      "room2Result"
    ).textContent = `The code to unlock the door is: ${Array.from(
      commonConcepts
    ).join(", ")}`;
  });

  // ROOM THREE:
  document.getElementById("solveRoom3").addEventListener("click", () => {
    fetch("directions.json")
      .then((response) => response.json())
      .then((directions) => {
        navigateLabyrinth(directions)
          .then((message) => {
            document.getElementById("room3Result").textContent = message;
          })
          .catch((error) =>
            console.error("Error navigating the labyrinth ☹️", error)
          );
      })
      .catch((error) => console.error("Error fetching directions 😵", error));
  });
});

//ROOM ONE
function findMostRecentBook(books) {
  const recentBook = books.reduce((mostRecent, book) =>
    new Date(book.published) > new Date(mostRecent.published)
      ? book
      : mostRecent
  );
  return recentBook;
}

//ROOM TWO:
function findIntersection(setA, setB) {
  const intersection = new Set();
  for (let i of setB) {
    if (setA.has(i)) {
      intersection.add(i);
    }
  }
  return intersection;
}

//ROOM THREE:
async function navigateLabyrinth(directions) {
  for (let direction of directions) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Navigating: ${direction.step}`);
  }
  return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
