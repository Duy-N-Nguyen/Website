var parenthesesBalance = 0;

//Automated Parentheses Placement: Utilizes extensive logic to accurately position parentheses based on multiple factors.
function toggleParenthesis() {
    const display = document.getElementById('display');
    const displayValue = display.value;

    //resets parentheses if counter somehow fell below zero
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

// Function to calculate percentage based on the input value from display
function calculatePercentage() {
    var displayValue = document.getElementById('display').value;
    var totalValue = 100;
    display.value = (displayValue) / (totalValue);
}

// Function to handle multiplication during expression evaluation
function handleMultiplication(expression) { 
    // Track the number of open and close parentheses in the display
    const openParenCount = (expression.match(/\(/g) || []).length;
    const closeParenCount = (expression.match(/\)/g) || []).length;

    if (openParenCount > closeParenCount) {
        // Remove the last character if it is '('
        if (expression.charAt(expression.length - 1) === '(') {
            // Remove the last character if it is '('
            while (expression.endsWith('(')) {
                expression = expression.slice(0, -1);
            }
        } else {
            // Add missing closing parentheses at the end
            const missingClosingParentheses = ')'.repeat(openParenCount - closeParenCount);
            expression += missingClosingParentheses;
        }
    }


    // Replace 'x' with '*'
    const expressionWithMultiplication = expression.replace(/x/g, '*');

    // Add multiplication operators between numbers and open parentheses
    const formattedExpression = expressionWithMultiplication.replace(/(\d+)\(/g, '$1*(');

    // Add multiplication operators between numbers inside consecutive parentheses
    const withMultiplication = formattedExpression.replace(/\)\(/g, ')*(');

    // Add multiplication operators between numbers inside consecutive parentheses with a leading decimal
    const withDecimalMultiplication = withMultiplication.replace(/\)\.(\d+)/g, ')*.$1');

    // Add multiplication operators between numbers inside consecutive parentheses with a non-digit character before the decimal
    const withNonDigitDecimalMultiplication = withDecimalMultiplication.replace(/\)([^\d\.])\.(\d+)/g, ')*$1.$2');

    // Replace (x)(x) with (x)*(x)
    let modifiedExpression = withNonDigitDecimalMultiplication.replace(/\((\d+)\)/g, '$1');

    // Replace x(x) with x * (x)
    modifiedExpression = modifiedExpression.replace(/(\d+)\((\d+)\)/g, '$1 * $2');

    return modifiedExpression;
}

// Parse the expression using a simple expression parser
function evaluateExpression(expression) {
    const result = parseExpression(expression);
    return result;
}

// Function to parse and evaluate a mathematical expression
function parseExpression(expression) {
    try {
        return eval(expression);
    } catch (error) {
        throw new Error('Error parsing expression');
    }
}

// Function to calculate the result of the expression in the display
function calculateResult() {
    // Get the display element
    const display = document.getElementById('display');
    
    // Get the current expression from the display
    const expression = display.value;
    
    /*    
    // Check if the last character is '(' and remove it
    if (expression.charAt(expression.length - 1) === '(') {
        display.value = expression.slice(0, -1);
    }
    */
    
    // Reset parentheses balance to 0
    parenthesesBalance = 0;
    try {
        // Format the expression by handling multiplication
        const formattedExpression = handleMultiplication(expression);
        
        // Evaluate the formatted expression and get the result
        const result = evaluateExpression(formattedExpression);
        
        // Update the display with the calculated result
        display.value = result;
    } catch (error) {
        // Handle errors by displaying 'Error' in the display
        display.value = 'Error';
    }
}

// Function to handle the AC (All Clear) button click and reset parentheses balance to 0
function onACButtonClick() {
    // Reset parenthesesBalance to 0
    parenthesesBalance = 0;

    // Clear the display
    document.getElementById('display').value = '';
}