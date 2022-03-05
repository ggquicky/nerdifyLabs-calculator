const calculatorBtns = document.querySelectorAll(".calculatorBtns");
const calculatorHistory = document.querySelector(".calculatorHistory");
const calculatorFP = document.querySelector(".calculatorFinishProcess");
const btnfunction = document.querySelectorAll(".btnfunction");
const btnNum = document.querySelectorAll(".btnNum");
const main = document.querySelector(".main");
const themeSwitch = document.querySelector(".themeswitch");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const calculatorOperation = [];
let number1 = "";
let number2 = "";
let foperator = "";

//===============================//
//Start dark mode theme functions//
//===============================//

if (prefersDarkScheme.matches) {
  applyTheme();
} else {
  removeTheme();
}

themeSwitch.addEventListener("click", applyTheme);

function applyTheme() {
  let themeCircle = document.querySelector(".circle");
  main.classList.toggle("darkThemeMain");
  btnNum.forEach((element) => {
    element.classList.toggle("darkThemeBtnNumber");
  });
  btnfunction.forEach((element) => {
    element.classList.toggle("darkThemeBtnFunctions");
  });
  calculatorFP.classList.toggle("calculatorFinishProcessDark");
  calculatorHistory.classList.toggle("calculatorHistoryDark");
  themeCircle.classList.toggle("circleDark");
  themeSwitch.classList.toggle("themeswitchDark");
}

function removeTheme() {
  let themeCircle = document.querySelector(".circle");
  main.classList.remove("darkThemeMain");
  btnNum.forEach((element) => {
    element.classList.remove("darkThemeBtnNumber");
  });
  btnfunction.forEach((element) => {
    element.classList.remove("darkThemeBtnFunctions");
  });
  calculatorFP.classList.remove("calculatorFinishProcessDark");
  calculatorHistory.classList.remove("calculatorHistoryDark");
  themeCircle.classList.remove("circleDark");
  themeSwitch.classList.remove("themeswitchDark");
}

//===============================//
//END dark mode theme functions//
//===============================//

//===============================//
//Start calculator input numbers functions//
//===============================//

calculatorBtns.forEach((btn) => {
  btn.addEventListener("click", addNumber);
});

function addNumber(event) {
  let negative = "-";
  let finalTotal = 0;

  switch (event.target.dataset.value) {
    case "sum":
      foperator = "+";
      previewCalculator();

      break;
    case "subtract":
      foperator = "-";
      previewCalculator();

      break;
    case "multiply":
      foperator = "x";
      previewCalculator();

      break;
    case "divide":
      foperator = "/";
      previewCalculator();

      break;
    case "backspace":
      if (foperator != "") {
        number2 = number2.slice(0, -1);
      } else {
        number1 = number1.slice(0, -1);
      }
      previewCalculator();
      break;
    case "clear":
      calculatorClear();
      break;

    case "percent":
      foperator = "%";
      previewCalculator();
      break;

    case "value":
      if (foperator != "") {
        if (number2.charAt(0) !== "-") {
          negative += number2;
          number2 = negative;
        }
      } else {
        if (number1.charAt(0) !== "-") {
          negative += number1;
          number1 = negative;
        }
      }
      previewCalculator();
      break;

    case ".":
      console.log(number1);
      if (foperator != "") {
        if (number2.indexOf(".") == -1) {
          number2 += event.target.dataset.value;
        }
      } else {
        if (number1.indexOf(".") == -1) {
          number1 += event.target.dataset.value;
        }
      }

      previewCalculator();
      break;

    case "equal":
      finalTotal = calculateExpression(number1, number2, foperator);
      if (finalTotal !== undefined ){
        calculatorFP.textContent = " ";
        calculatorDisplay(finalTotal);
      }
      
      break;

    default:
      if (foperator != "") {
        number2 += event.target.dataset.value;
      } else {
        number1 += event.target.dataset.value;
      }
      console.log(number1, number2);
      previewCalculator();
      break;
  }
}

function previewCalculator() {
  let displayAmount = number1 + foperator + number2;
  calculatorFP.textContent = displayAmount;
}

function calculateExpression(number1, number2, foperator) {
  //  let negativeValue = false;
  // if (calculatorOperation[0] === "-"){
  //     calculatorOperation.shift();
  //     negativeValue = true
  // }

  if( number1 == "") {
    
    console.log(number1);
    return
  }
  if( number2 == ""){
       console.log(number2);
       return
  }

  let total = 0;
  calculatorHistory.textContent = number1 + foperator + number2;

  switch (foperator) {
    case "+":
      total = parseFloat(number1) + parseFloat(number2);

      return total.toFixed(2);
    case "-":
      total = parseFloat(number1) - parseFloat(number2);

      return total.toFixed(2);
    case "x":
      total = parseFloat(number1) * parseFloat(number2);

      return total.toFixed(2);
    case "/":
      total = parseFloat(number1) / parseFloat(number2);

      return total.toFixed(2);
    case "%":
      total = parseFloat(number1) * (0.01 * parseFloat(number2));

      return total.toFixed(2);

    default:
      break;
  }
  return;
}

function calculatorDisplay(finalTotal) {
  console.log(finalTotal);
  calculatorFP.textContent = finalTotal;
}

function calculatorClear() {
  while (calculatorOperation.length > 0) {
    calculatorOperation.pop();
  }
  number1 = "";
  number2 = "";
  foperator = "";
  calculatorFP.textContent = 0;
}

//===============================//
//END calculator input numbers functions//
//===============================//
