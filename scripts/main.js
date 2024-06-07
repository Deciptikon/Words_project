let words = [];
let currentWordIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/words.json")
    .then((response) => response.json())
    .then((data) => {
      words = data;
      loadNextWord();
    });

  document.getElementById("submit-button").addEventListener("click", checkWord);
});

function loadNextWord() {
  if (currentWordIndex >= words.length) {
    document.getElementById("result").innerText = "You've completed the game!";
    return;
  }
  const wordData = words[currentWordIndex];
  document.getElementById("word-image").src = wordData.image;
  document.getElementById("word-input").value = "";
  document.getElementById("result").innerText = "";
}

function checkWord() {
  const userWord = document
    .getElementById("word-input")
    .value.trim()
    .toLowerCase();
  const correctWord = words[currentWordIndex].word.toLowerCase();

  if (userWord === correctWord) {
    document.getElementById("result").innerText = "Correct!";
    currentWordIndex++;
    setTimeout(loadNextWord, 1000); // Load next word after 1 second
  } else {
    document.getElementById("result").innerText = "Try again!";
  }
}
