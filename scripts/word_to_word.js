let words = [];
let wordsLength = 0;

let positiveScore = 0;
let negativeScore = 0;
let currentWordIndex = 0;

let rootStyles;
let bgColor;
let positiveScoreColor;
let negativeScoreColor;

let isPause = false;

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/dict.json")
    .then((response) => response.json())
    .then((data) => {
      words = data;
      wordsLength = words.length;

      rootStyles = getComputedStyle(document.documentElement);
      bgColor = rootStyles.getPropertyValue("--background-color").trim();
      positiveScoreColor = rootStyles
        .getPropertyValue("--color-positive-score")
        .trim();
      negativeScoreColor = rootStyles
        .getPropertyValue("--color-negative-score")
        .trim();

      loadNextWord();
    });

  document.getElementById("submit-button").addEventListener("click", checkWord);
  document.addEventListener("keydown", handleKeyPress);
});

function handleKeyPress(event) {
  if (event.key === "Enter") {
    if (isPause) {
      return;
    }

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

  var wordInput = document.getElementById("word-input");
  wordInput.style.backgroundColor = bgColor;
  wordInput.value = "";

  document.getElementById("result").innerText = "";

  isPause = false;
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
    document.getElementById("word-input").style.backgroundColor =
      positiveScoreColor;
    document.getElementById("positive-score").innerText = String(positiveScore);
  } else {
    //document.getElementById("result").innerText = "Попробуй снова!";
    negativeScore++;
    document.getElementById("word-input").style.backgroundColor =
      negativeScoreColor;
    document.getElementById("negative-score").innerText = String(negativeScore);
  }

  isPause = true;
  setTimeout(loadNextWord, 1000);
}

function getRandomInt(min, max) {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getStringRGB(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}
