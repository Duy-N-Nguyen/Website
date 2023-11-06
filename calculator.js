function clearDisplay() {
    document.getElementById("display").value = "";
}

function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function calculate() {
    try {
        document.getElementById("display").value = eval(document.getElementById("display").value);
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}
let currentInput = '';
let currentOperator = '';
let previousInput = '';

function appendValue(value) {
    currentInput += value;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    currentOperator = '';
    previousInput = '';
    updateDisplay();
}

function calculate() {
    if (currentInput && currentOperator && previousInput) {
        currentInput = operate(previousInput, currentInput, currentOperator);
        currentOperator = '';
        previousInput = '';
        updateDisplay();
    }
}

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) return 'Error';
            return a / b;
        default:
            return 'Error';
    }
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}

updateDisplay();
