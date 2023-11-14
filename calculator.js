var parenthesesBalance = 0;

function toggleParenthesis() {
    const display = document.getElementById('display');
    const displayValue = display.value;

    if (parenthesesBalance < 0) {
        parenthesesBalance = 0;
    }

    // Track the number of open and close parentheses in the display
    const openParenCount = (displayValue.match(/\(/g) || []).length;
    const closeParenCount = (displayValue.match(/\)/g) || []).length;

    if (!displayValue || displayValue.charAt(displayValue.length - 1) === '(') {
        // Case: Either the display is empty or the last character is an open parenthesis
        display.value += '(';
        parenthesesBalance++;
    } else if (/\d/.test(displayValue.charAt(displayValue.length - 1)) && openParenCount > closeParenCount) {
        // Case: The last character is a digit, and there are open parentheses to close
        display.value += ')';
        parenthesesBalance--;
    } else if (displayValue.charAt(displayValue.length - 1) === ')' && openParenCount > closeParenCount) {
        // Case: The last character is a close parenthesis, and there are open parentheses to close
        display.value += ')';
        parenthesesBalance--;
    } else if (displayValue.charAt(displayValue.length - 1) === ')' && openParenCount === closeParenCount) {
        // Case: The last character is a close parenthesis, but there are no open parentheses to close
        display.value += '(';
        parenthesesBalance++;
    } else if (/[+\-x÷]/.test(displayValue.charAt(displayValue.length - 1))) {
        // Case: The last character is an operator, add an open parenthesis
        display.value += '(';
        parenthesesBalance++;
    } else if (parenthesesBalance === 0) {
        // Case: No open parentheses yet, add an open parenthesis
        display.value += '(';
        parenthesesBalance++;
    }
}

function calculateResult() {
    const display = document.getElementById('display');
    const expression = display.value;
    parenthesesBalance = 0;
    try {
        const formattedExpression = handleMultiplication(expression);
        const result = evaluateExpression(formattedExpression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function handleMultiplication(expression) {
    // Replace 'x' with '*'
    const expressionWithMultiplication = expression.replace(/x/g, '*');

    // Add multiplication operators between numbers and open parentheses
    const formattedExpression = expressionWithMultiplication.replace(/(\d+)\(/g, '$1*(');

    // Add multiplication operators between numbers inside consecutive parentheses
    const withMultiplication = formattedExpression.replace(/\)(\d+)/g, ')*$1');

    // Add multiplication operators between two numbers in parentheses without an operator
    const withPatternReplacement = replacePatterns(withMultiplication);

    return withPatternReplacement;
}


function replacePatterns(inputString) {
    // Replace (x)(x) with (x)*(x)
    let modifiedString = inputString.replace(/\((\d+)\)/g, '$1');

    // Replace x(x) with x * (x)
    modifiedString = modifiedString.replace(/(\d+)\((\d+)\)/g, '$1 * $2');

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

function onACButtonClick() {
    // Reset parenthesesBalance to 0
    parenthesesBalance = 0;

    // Clear the display
    document.getElementById('display').value = '';
}