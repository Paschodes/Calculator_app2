class Calculator {
    //de constructor is taing the 2 inputs bcos we need to know where to place our display text for our calculator. so we just say...
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        //remove de last number
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    //function for choosing de number clicked on
    appendNumber(number) {
        //check if number is '.' nd we already have a '.' return nd stop our function from working further
        if (number === '.' && this.currentOperand.includes('.')) return
        //dis append numbers once you click on it  
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    //function for choosing de operator clicked on
    chooseOperation(operation) {
        //if no operand is choosen before clicking de '=', de function should not do anything
        if (this.currentOperand === '') return
        //if de previous operand exits den do de computation(if user clicked on any operand)
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        //when you choose an operation after typing a number, de previous number bcomes the current number nd de current num bcomes empty
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //function for calculating total
    compute() {
        //result of our compute function
        let computation;
        //number version of our previous operand
        const prev = parseFloat(this.previousOperand);
        //number version of our current operand
        const current = parseFloat(this.currentOperand);
        //if there is no current or previous value den de '=' wont function
        if (isNaN(prev) || isNaN(current)) return
        //then do the operand calculations with a switch statement
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;

            case '-':
                computation = prev - current
                break;

            case '*':
                computation = prev * current
                break;

            case '/':
                computation = prev / current
                break;
        
            default:
                break;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    //for adding commas to longer digits nd co
    getDisplayNumber(number) {
        //for the decimal place
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        //for de integers
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    //function for displaying de input & output
    updateDisplay() {
        //for displaying de current operand
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        //for displaying de operands
        if (this.operation != null) {
            //for displaying de previous operand
        this.previousOperandTextElement.innerText = this.previousOperand;
        `${this.getDisplayNumber(previousOperand)} ${this.operation}`
        } else {
            //for removing de previous element after calculation
            this.previousOperandTextElement.innerText = '';
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//first create a calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
//now we've passed the elements in we can now use de calculator object

//we loop 2ru each button nd add an event listener
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        //add the button selected to de display
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        //add the operation button selected to de display
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});