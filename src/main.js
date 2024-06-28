import { updateDisplayValue, highlightSelectedOperatorButton, unhighlightOperatorButtons } from './functions/domInteraction.js'
import { addEventListeners } from './functions/events.js'

/* -------- CONSTANTS -------- */
const DISPLAY_MAX_LENGHT = 9

/* -------- GLOBAL VALUES -------- */
let number1 = ''
let number2 = ''
let operator = ''
let result = null

/* -------- STATES -------- */
let hasDecimal = false
let isNumber1Finished = false
let isCurrentNumberEmpty = true
let isOperatorSelected = false
let resultNeedToBeShown = false
let isNegative = false
let isError = false

/* -------- DOM ELEMENTS -------- */
let display
let numberButtons
let decimalButton
let operatorButtons
let clearButton
let changeSignButton
let equalButton

/* --------------- MAIN --------------- */

export function main () {
  mapDomElements()
  addEventListeners(numberButtons, clearButton, operatorButtons, equalButton, decimalButton, changeSignButton)
  logInfo()
}

function mapDomElements () {
  display = document.querySelector('#display')
  numberButtons = document.querySelectorAll('[data-type=number]')
  decimalButton = document.querySelector('[data-type=decimal]')
  operatorButtons = document.querySelectorAll('[data-type=operator]')
  clearButton = document.querySelector('[data-type=clear]')
  changeSignButton = document.querySelector('[data-type=changeSign]')
  equalButton = document.querySelector('[data-type=equal]')
}

function refreshCalculatorUI () {
  if (isError) result = 'Error'

  if (resultNeedToBeShown) {
    updateDisplayValue(display, result)
    unhighlightOperatorButtons(operatorButtons)
    resultNeedToBeShown = false
    return
  }

  if (isOperatorSelected) highlightSelectedOperatorButton(operatorButtons, operator)
  else unhighlightOperatorButtons(operatorButtons)

  if (isNumber1Finished && number2.length > 0 && result != null && !isNegative) return

  if (isNumber1Finished && number2.length > 0) updateDisplayValue(display, number2)
  else updateDisplayValue(display, number1)

  logInfo()
}

function updateNumber1 (value) {
  if (number1.length >= DISPLAY_MAX_LENGHT) return

  if (isCurrentNumberEmpty) {
    number1 = value
    isCurrentNumberEmpty = false
  } else {
    number1 += value
  }
}

function updateNumber2 (value) {
  if (number2.length > 0 && result != null && number2 != '-') {
    number1 = String(result)
    number2 = value
    result = null
    isCurrentNumberEmpty = false
  } else if (isCurrentNumberEmpty) {
    number2 = value
    isCurrentNumberEmpty = false
  } else {
    if (number2.length >= DISPLAY_MAX_LENGHT) return
    number2 += value
  }
}

function calculateResult (number1, number2, operator) {
  const num1 = parseFloat(number1)
  const num2 = parseFloat(number2)

  switch (operator) {
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case 'x':
      return num1 * num2
    case '/':
      if (num2 == 0) {
        isError = true
        return null
      } else return num1 / num2
    default:
      if (isNumber1Finished) return number2
      else return number1
  }
}

function formatResult (number) {
  let decimalAmount = 1
  let formatedResult

  do {
    decimalAmount++
    formatedResult = number.toExponential(decimalAmount)
  } while (String(formatedResult).length < 9)

  return formatedResult
}

function toggleNegativeSign (number) {
  let formattedNumber

  if (isNegative) {
    formattedNumber = number.slice(1, number.length)
    isNegative = false
  } else {
    if (number.length >= DISPLAY_MAX_LENGHT) return number

    if (isCurrentNumberEmpty) {
      formattedNumber = '-'
      isCurrentNumberEmpty = false
    } else formattedNumber = '-' + number

    isNegative = true
  }

  return formattedNumber
}

/* --------------- HANDLERS --------------- */

export function handleNumberInput (selectedNumber) {
  if (isError) return

  if (isNumber1Finished) updateNumber2(selectedNumber)
  else updateNumber1(selectedNumber)

  refreshCalculatorUI()
}

export function handleClear () {
  number1 = ''
  number2 = ''
  operator = ''
  result = null
  hasDecimal = false
  isNumber1Finished = false
  isCurrentNumberEmpty = true
  isOperatorSelected = false
  resultNeedToBeShown = false
  isNegative = false
  isError = false

  refreshCalculatorUI()
  updateDisplayValue(display, '0')
}

export function handleOperatorInput (selectedOperator) {
  if (isError) return

  operator = selectedOperator
  isOperatorSelected = true
  isNumber1Finished = true
  isCurrentNumberEmpty = true
  hasDecimal = false
  isNegative = false
  refreshCalculatorUI()
}

export function handleEqual () {
  if (isError) return
  if (number2.length <= 0) return

  result = calculateResult(number1, number2, operator)
  if (String(result).length > DISPLAY_MAX_LENGHT) result = formatResult(result)
  resultNeedToBeShown = true
  isOperatorSelected = false

  // number1 = number2
  number1 = String(result)
  refreshCalculatorUI()
  logInfo()
}

export function handleDecimal () {
  if (hasDecimal) return

  if (isNumber1Finished) {
    if (number2.length >= DISPLAY_MAX_LENGHT) return

    if (isCurrentNumberEmpty) number2 = '0.'
    else number2 += '.'
  } else {
    if (number1.length >= DISPLAY_MAX_LENGHT) return

    if (isCurrentNumberEmpty) number1 = '0.'
    else number1 += '.'
  }

  hasDecimal = true

  refreshCalculatorUI()
}

export function handleChangeSign () {
  if (isError) return

  if (number1.length > 0 && number2.length > 0 && !resultNeedToBeShown && !isOperatorSelected) handleClear()

  if (isNumber1Finished) number2 = toggleNegativeSign(number2)
  else number1 = toggleNegativeSign(number1)

  refreshCalculatorUI()
}

function logInfo () {
  console.log({
    number1,
    number2,
    operator,
    result,
    hasDecimal,
    isNumber1Finished,
    isCurrentNumberEmpty,
    isOperatorSelected,
    resultNeedToBeShown,
    isNegative,
    isError
  })
}
