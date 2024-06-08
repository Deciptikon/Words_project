document.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("glow-on-hover");
  button.addEventListener("click", () => {
    var link = button.getAttribute("data-href");
    console.log(link);
    window.location.href = link;
  });

  //var button1 = document.getElementById("button-to-page1");
  //button1.addEventListener("click", () => {
  //  var link = button1.getAttribute("data-href");
  //  console.log(link);
  //  window.location.href = link;
  //});

  //var button2 = document.getElementById("button-to-page2");
  //button2.addEventListener("click", () => {
  //  var link = button2.getAttribute("data-href");
  //  console.log(link);
  //  window.location.href = link;
  //});

  //var button3 = document.getElementById("button-to-page3");
  //button3.addEventListener("click", () => {
  //  var link = button3.getAttribute("data-href");
  //  console.log(link);
  //  window.location.href = link;
  //});
});
