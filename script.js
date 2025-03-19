let display = document.getElementById("display");
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        display.innerText = digit;
        waitingForSecondOperand = false;
    } else {
        display.innerText = display.innerText === "0" ? digit : display.innerText + digit;
    }
}

function inputDecimal() {
    if (waitingForSecondOperand) {
        display.innerText = "0.";
        waitingForSecondOperand = false;
    } else if (!display.innerText.includes(".")) {
        display.innerText += ".";
    }
}

function clearDisplay() {
    display.innerText = "0";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function backspace() {
    display.innerText = display.innerText.length > 1 ? display.innerText.slice(0, -1) : "0";
}

function performOperation(nextOperator) {
    const inputValue = parseFloat(display.innerText);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        display.innerText = result;
        firstOperand = parseFloat(result);
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case "+":
            return (firstOperand + secondOperand).toFixed(10).replace(/\.?0+$/, "");
        case "-":
            return (firstOperand - secondOperand).toFixed(10).replace(/\.?0+$/, "");
        case "*":
            return (firstOperand * secondOperand).toFixed(10).replace(/\.?0+$/, "");
        case "/":
            return secondOperand === 0 ? "Error" : (firstOperand / secondOperand).toFixed(10).replace(/\.?0+$/, "");
        default:
            return secondOperand.toString();
    }
}

function handleEqual() {
    if (firstOperand !== null && operator !== null) {
        const inputValue = parseFloat(display.innerText);
        const result = calculate(firstOperand, inputValue, operator);
        display.innerText = result;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }
}
