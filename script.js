const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

let firtsValue= 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
// replace current display value if the first value is entered
if(awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
} else {
    // if current display value is 0, replace it , if not  add number 
    const displayValue = calculatorDisplay.textContent 
    calculatorDisplay.textContent = displayValue === '0' ? number : 
    displayValue + number
  
}

}
function addDecimal() {
    // if operator paddsed , dont add decimal
    if (awaitingNextValue) return ;
// if no decimal add one 
if(!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
}
}

// calculate first the sectond and second values depent on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
// prevent muliplay operator
if (operatorValue && awaitingNextValue) {
    operatorValue = operator
    return;
}
//   assign firstValue 
if(!firtsValue) {
    firtsValue = currentValue;
} else{
    console.log(firtsValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](firtsValue, currentValue);
   calculatorDisplay.textContent = calculation;
    firtsValue = calculation
}
awaitingNextValue = true;

operatorValue = operator;
console.log('first value',firtsValue);
console.log('operator',operatorValue);
}


 inputBtns.forEach((inputBtns) => {
     if (inputBtns.classList.length === 0) {
         inputBtns.addEventListener('click' , () => sendNumberValue(inputBtns.value))
     } else if (inputBtns.classList.contains('operator')) {
        inputBtns.addEventListener('click' , () => useOperator(inputBtns.value))

     } else if (inputBtns.classList.contains('decimal')) {
        inputBtns.addEventListener('click' , () => addDecimal())

     }
 })
// reast  display
function resetAll() {
    firtsValue= 0;
    operatorValue = '';
    awaitingNextValue = false;
   calculatorDisplay.textContent = '0'
}
// event listner 
 clearBtn.addEventListener('click' , resetAll)