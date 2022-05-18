const currencyRatio = {
  VND: {
    USD: 0.000043,
    KRW: 0.055,
    VND: 1,
    unit: "동",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2560px-Flag_of_Vietnam.svg.png",
  },
  USD: {
    USD: 1,
    KRW: 1272.17,
    VND: 23128.00,
    unit: "달러",
    img: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
  },
  KRW: {
    USD: 0.00079 ,
    KRW: 1,
    VND: 18.18,
    unit: "원",
    img: "https://cdn.countryflags.com/thumbs/south-korea/flag-400.png",
  },
};
var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");
let toCurrency = "USD";
let fromCurrency = "USD";

document.querySelectorAll("#from-currency-list li").forEach(function (item) {
  item.addEventListener("click", function () {
    fromCurrency = this.textContent;
    fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
    convert("from");
  });
});

document.querySelectorAll("#to-currency-list li").forEach(function (item) {
  item.addEventListener("click", function () {
    toCurrency = this.textContent;
    toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
    convert("from");
  });
});

function convert(type) {
  console.log("here");
  let amount = 0;
  if (type == "from") {

    amount = document.getElementById("fromAmount").value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    document.getElementById("toAmount").value = convertedAmount;
    renderKoreanNumber(amount, convertedAmount);
  } else {
    amount = document.getElementById("toAmount").value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
    document.getElementById("fromAmount").value = convertedAmount;
    renderKoreanNumber(convertedAmount, amount);
  }
}
function renderKoreanNumber(from, to) {
  document.getElementById("fromNumToKorea").textContent =
    readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent =
    readNum(to) + currencyRatio[toCurrency].unit;
}
function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }
  return resultString;
}
