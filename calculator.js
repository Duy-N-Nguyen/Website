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
    else if (/^[0-9]$/.test(displayValue.charAt(displayValue.length - 1)) && left_parentheses_counter === 0) {
        display.value += ')';
        left_parentheses_counter++;
    }
    else {
        display.value += ')';
        left_parentheses_counter--;
    }
}

function calculateResult() {
    const display = document.getElementById('display');
    const expression = display.value;

    try {
        const formattedExpression = handleMultiplication(expression);
        const result = evaluateExpression(formattedExpression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function handleMultiplication(expression) {
    // Add multiplication operators between numbers and open parentheses
    const formattedExpression = expression.replace(/(\d+)\(/g, '$1*(');

    // Add multiplication operators between numbers inside consecutive parentheses
    const withMultiplication = formattedExpression.replace(/\)(\d+)/g, ')*$1');

    // Add multiplication operators between two numbers in parentheses without an operator
    const withPatternReplacement = replacePatterns(withMultiplication);

    return withPatternReplacement;
}

function replacePatterns(inputString) {
    // Replace (8)(8) with (8)*(8)
    let modifiedString = inputString.replace(/\((\d+)\)\((\d+)\)/g, '($1)*($2)');

    // Replace 9(5) with 9 * (5)
    modifiedString = modifiedString.replace(/(\d+)\((\d+)\)/g, '$1 * ($2)');

    return modifiedString;
}

function evaluateExpression(expression) {
    // Parse the expression using a simple expression parser
    const result = parseExpression(expression);
    return result;
}

function parseExpression(expression) {
    // Implement your expression parsing logic here
    // You can use a library like math.js for more advanced parsing
    // For simplicity, let's use eval in this example (not recommended for untrusted input)
    try {
        return eval(expression);
    } catch (error) {
        throw new Error('Error parsing expression');
    }
}