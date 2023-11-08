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
    const display = document.getElementById('display');
    const expression = display.value;

    try {
        const result = evaluateExpression(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function evaluateExpression(expression) {
    // Use regular expressions to replace invalid characters for security
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '');

    // Check for balanced parentheses
    if (!areParenthesesBalanced(sanitizedExpression)) {
        throw new Error('Unbalanced parentheses');
    }

    // Use the JavaScript `eval` function to evaluate the expression
    return eval(sanitizedExpression);
}

function areParenthesesBalanced(expression) {
    const stack = [];

    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '(') {
            stack.push('(');
        } else if (expression[i] === ')') {
            if (stack.length === 0) {
                return false; // Unbalanced closing parenthesis
            }
            stack.pop();
        }
    }

    return stack.length === 0; // Stack should be empty for balanced parentheses
}
