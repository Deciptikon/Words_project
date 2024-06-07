document.addEventListener("DOMContentLoaded", () => {
  // Находим кнопку по её id
  var button = document.getElementById("button-to-page1");
  console.log("HELLO");
  // Добавляем обработчик события клика на кнопку
  button.addEventListener("click", () => {
    // Получаем ссылку из атрибута data-href
    var link = button.getAttribute("data-href");
    // Переходим по указанной ссылке
    console.log(link);
    window.location.href = link;
  });
});
