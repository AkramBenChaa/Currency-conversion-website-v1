let inputOne = document.getElementById("inputOne");
let inputTwo = document.getElementById("inputTwo");
let selectOne = document.querySelector("#selectOne");
let selectTwo = document.querySelector("#selectTwo");

fetch("https://api.frankfurter.dev/v2/currencies")
  .then((response) => response.json())
  .then((data) => {
    Object.entries(data).forEach(function (currency) {
      let optionOne = document.createElement("option");
      optionOne.value = currency[1].iso_code;
      optionOne.textContent = currency[1].iso_code;

      let optionTwo = document.createElement("option");
      optionTwo.value = currency[1].iso_code;
      optionTwo.textContent = currency[1].iso_code;

      selectOne.appendChild(optionOne);
      selectTwo.appendChild(optionTwo);
    });
  });

let currentRate = 1;

function rates() {
  fetch(
    `https://api.frankfurter.dev/v2/rate/${selectOne.value}/${selectTwo.value}`,
  )
    .then((response) => response.json())
    .then((data) => {
      currentRate = data.rate;
    });
}

inputOne.addEventListener("input", function () {
  inputTwo.value = (inputOne.value * currentRate).toFixed(2);
});

inputTwo.addEventListener("input", function () {
  inputOne.value = (inputTwo.value / currentRate).toFixed(2);
});
selectOne.addEventListener("change", rates);
selectTwo.addEventListener("change", rates);
