const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const url = `https://api.adviceslip.com/advice`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    quote.innerHTML = data.slip.advice;
  });
