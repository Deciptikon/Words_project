let words = [];
let currentWordIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/dict.json")
    .then((response) => response.json())
    .then((data) => {
      words = data;
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
  if (currentWordIndex >= words.length) {
    document.getElementById("result").innerText =
      "Вы написали все слова на сегодня!";
    return;
  }
  const wordData = words[currentWordIndex];
  document.getElementById("chines_word").innerText = wordData.china_word;
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
    document.getElementById("result").innerText = "Верно!";
    currentWordIndex++;
    setTimeout(loadNextWord, 3000); // Load next word after 1 second
  } else {
    document.getElementById("result").innerText = "Попробуй снова!";
  }
}
