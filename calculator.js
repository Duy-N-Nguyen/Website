// JavaScript functions for your calculator

var left_parentheses_counter = 0;
function toggleParenthesis() {
    const display = document.getElementById('display');
    const displayValue = display.value;
    if (displayValue.length === 0 || displayValue.charAt(displayValue.length - 1) === '(') {
        display.value += '(';
        left_parentheses_counter++;
    }
    else if (/^[0-9]$/.test(displayValue.charAt(displayValue.length - 1)) && left_parentheses_counter > 0) {
        display.value += ')';
        left_parentheses_counter--;
    }
    else if (left_parentheses_counter == 0) {
        display.value += '(';
        left_parentheses_counter++;
    }
    else {
        display.value += ')';
        left_parentheses_counter--;
    }
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


