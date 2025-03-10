document.addEventListener("DOMContentLoaded", () => {
  // Display the definition using Typewriter effect
  function displayDefinition(response) {
    console.log("API Response:", response);

    const definitionElement = document.querySelector("#definition");
    if (response.data.answer) {
      const typewriter = new Typewriter(definitionElement, {
        loop: false,
        delay: 50,
      });

      typewriter.deleteAll().typeString(response.data.answer).start();
    } else {
      definitionElement.innerHTML = "No definition found. Try another word!";
    }
  }

  // Generate definition using SheCodes API
  function generateDefinition(event) {
    event.preventDefault();

    let instructionsInput = document.querySelector("#user-instructions").value;
    let apiKey = "d78e7acc0to3ab4c102473f7fd13b43e";
    let context =
      "Provide a simple, easy-to-understand definition of the word.";
    let prompt = `Define the word: ${instructionsInput}`;

    let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
      prompt
    )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    console.log("API URL:", apiURL);

    let definitionElement = document.querySelector("#definition");
    definitionElement.classList.remove("hidden");
    definitionElement.innerHTML = `⏳ Generating a definition for "${instructionsInput}"...`;

    axios
      .get(apiURL)
      .then(displayDefinition)
      .catch((error) => {
        console.error("API Error:", error);
        definitionElement.innerHTML = "Failed to load definition. Try again.";
      });
  }

  // Randomly position colored squares outside the container
  function generateRandomSquares() {
    const squareCount = 12;
    const container = document.body;
    const containerRect = document
      .querySelector(".container")
      .getBoundingClientRect();

    for (let i = 0; i < squareCount; i++) {
      const square = document.createElement("div");
      square.classList.add("square", `square-${(i % 7) + 1}`);

      let x, y;
      do {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
      } while (
        x > containerRect.left &&
        x < containerRect.right &&
        y > containerRect.top &&
        y < containerRect.bottom
      );

      square.style.left = `${x}px`;
      square.style.top = `${y}px`;

      // Random fade timing
      square.style.animationDelay = `${Math.random() * 3}s`;

      container.appendChild(square);
    }
  }

  // Event listeners
  document
    .querySelector("#definition-generator-form")
    .addEventListener("submit", generateDefinition);

  // Create random squares
  generateRandomSquares();
});
