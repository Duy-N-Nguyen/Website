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
