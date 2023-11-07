// JavaScript functions for your calculator

let isOpenParenthesis = false;

function toggleParenthesis() {
    const button = document.getElementById('parenthesisButton');
    if (isOpenParenthesis) {
        document.getElementById('display').value += ')';
    } else {
        document.getElementById('display').value += '(';
    }
    isOpenParenthesis = !isOpenParenthesis;
}

function calculateResult() {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function calculatePercentage() {
    const currentValue = parseFloat(document.getElementById('display').value);
    if (!isNaN(currentValue)) {
        const percentageValue = currentValue / 100;
        document.getElementById('display').value = percentageValue;
    }
}
