import { handleNumberInput, handleClear, handleOperatorInput, handleEqual, handleDecimal, handleChangeSign } from '../main.js'

export function addEventListeners (numberButtons, clearButton, operatorButtons, equalButton, decimalButton, changeSignButton) {
  addNumberButtonsEventListener(numberButtons)
  addClearButtonEventListener(clearButton)
  addOperatorButtonsEventListener(operatorButtons)
  addEqualButtonEventListener(equalButton)
  addDecimalButtonEventListener(decimalButton)
  addChangeSignButtonEventListener(changeSignButton)
  addKeyboardEventListener()
}

function addNumberButtonsEventListener (numberButtons) {
  numberButtons.forEach(b => {
    b.addEventListener('click', (e) => handleNumberInput(e.target.textContent))
  })
}

function addClearButtonEventListener (clearButton) {
  clearButton.addEventListener('click', (e) => handleClear())
}

function addOperatorButtonsEventListener (operatorButtons) {
  operatorButtons.forEach(b => {
    b.addEventListener('click', (e) => handleOperatorInput(e.target.getAttribute('data-operator')))
  })
}

function addEqualButtonEventListener (equalButton) {
  equalButton.addEventListener('click', (e) => handleEqual())
}

function addDecimalButtonEventListener (decimalButton) {
  decimalButton.addEventListener('click', (e) => handleDecimal())
}

function addChangeSignButtonEventListener (changeSignButton) {
  changeSignButton.addEventListener('click', (e) => handleChangeSign())
}

function addKeyboardEventListener () {
  document.addEventListener('keydown', (e) => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    const operators = ['+', '-', '*', '/']

    if (numbers.some(n => n === e.key)) handleNumberInput(e.key)

    if (operators.some(o => o === e.key)) handleOperatorInput(e.key)

    if (e.key === '.') handleDecimal()

    if (e.key === '=' || e.key === 'Enter') handleEqual()

    if (e.key === 'Escape' || e.key === 'Delete') handleClear()
  })
}
