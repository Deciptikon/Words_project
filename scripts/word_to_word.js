let words = [];
let wordsLength = 0;
let positiveScore = 0;
let negativeScore = 0;
let currentWordIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/dict.json")
    .then((response) => response.json())
    .then((data) => {
      words = data;
      wordsLength = words.length;
      loadNextWord();
    });

  document.getElementById("submit-button").addEventListener("click", checkWord);
  document.addEventListener("keydown", handleKeyPress);
});

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkWord();
  }
}

function loadNextWord() {
  currentWordIndex = getRandomInt(0, wordsLength);
  const wordData = words[currentWordIndex];

  document.getElementById("positive-score").innerText = String(positiveScore);
  document.getElementById("negative-score").innerText = String(negativeScore);
  document.getElementById("chines_word").innerText = wordData.china_word;
  document.getElementById("word-input").value = "";
  document.getElementById("result").innerText = "";
}

function checkWord() {
  const userWord = document
    .getElementById("word-input")
    .value.trim()
    .toLowerCase();

  const correctWords = words[currentWordIndex].russ_words.map((word) =>
    word.toLowerCase()
  );

  if (correctWords.includes(userWord)) {
    //document.getElementById("result").innerText = "Верно!";
    positiveScore++;
  } else {
    //document.getElementById("result").innerText = "Попробуй снова!";
    negativeScore++;
  }
  setTimeout(loadNextWord, 1000);
}

function getRandomInt(min, max) {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
