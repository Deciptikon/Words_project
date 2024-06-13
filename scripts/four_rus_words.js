let words = [];
let wordsLength = 0;

let positiveScore = 0;
let negativeScore = 0;
let currentWordIndex = 0;
let wordsData = [];

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

  for (let i = 0; i < 4; i++) {
    document
      .getElementById(`answer-${i}`)
      .addEventListener("click", function () {
        checkWord(i);
      });
  }

  document.addEventListener("keydown", handleKeyPress);
});

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    //checkWord();
  }
  if (event.key >= "1" && event.key <= "4") {
    const index = parseInt(event.key);
    checkWord(index);
  }
}

function loadNextWord() {
  currentWordIndex = getRandomInt(0, 4);

  var wordsArray = getRandomNumbers(wordsLength - 1, 4);
  for (let i = 0; i < 4; i++) {
    wordsData.push(words[wordsArray[i]]);
  }

  document.getElementById("positive-score").innerText = String(positiveScore);
  document.getElementById("negative-score").innerText = String(negativeScore);
  document.getElementById("chines_word").innerText =
    wordsData[currentWordIndex].china_word;

  for (let i = 0; i < 4; i++) {
    var bttAnswer = document.getElementById(`answer-${i}`);
    bttAnswer.style.backgroundColor = bgColor;
    bttAnswer.value = wordsData[currentWordIndex].russ_words.join(", ");
  }

  document.getElementById("result").innerText = "";

  isPause = false;
}

function checkWord(index) {
  if (isPause) {
    return;
  }

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

function getRandomNumbers(n, count) {
  let numbers = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers.slice(0, count);
}

function getStringRGB(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}
