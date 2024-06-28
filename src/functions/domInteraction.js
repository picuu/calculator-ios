export function updateDisplayValue (display, value) {
  if (value == '-') display.textContent = '-0'
  else if (value && value != '') display.textContent = value
  else display.textContent = '0'
}

export function disbleDomButton (domElement) {
  domElement.classList.add('disabled')
  domElement.setAttribute('disabled', '')
}

export function enableDomButton (domElement) {
  domElement.classList.remove('disabled')
  domElement.removeAttribute('disabled')
}

export function highlightSelectedOperatorButton (operatorButtons, selectedOperator) {
  unhighlightOperatorButtons(operatorButtons)

  operatorButtons.forEach(btn => {
    if (btn.getAttribute('data-operator') == selectedOperator) {
      btn.classList.add('selected')
    }
  })
}

export function unhighlightOperatorButtons (operatorButtons) {
  operatorButtons.forEach(btn => btn.classList.remove('selected'))
}
