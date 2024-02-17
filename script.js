let first = ''
let second = ''
let operation = null
let resetScreenValue = false

const currentScreen = document.querySelector('.current')
const prevScreen = document.querySelector('.prev')
const numBtns = document.querySelectorAll('.num')
const operationBtns = document.querySelectorAll('.operation')
const dotBtn = document.querySelector('.dot')
const equalsBtn = document.querySelector('.equals')
const clearBtn = document.querySelector('.clear')
const deleteBtn = document.querySelector('.delete')

numBtns.forEach((btn) => 
    btn.addEventListener('click', () => setNumber(btn.textContent))
)

operationBtns.forEach((btn) => 
    btn.addEventListener('click', () => setOperation(btn.textContent))
)

const setNumber = (num) => {
    if (currentScreen.textContent === '0' || resetScreenValue) {
        resetScreen()
    }
    currentScreen.textContent += num
}

const setOperation = (operator) => {
    if (operation !== null) nextNumber()
    first = currentScreen.textContent
    operation = operator
    prevScreen.textContent = `${currentScreen.textContent} ${operation}`
    resetScreenValue = true
}

const nextNumber = () => {
    if (operation === null) return
    if (currentScreen.textContent === '0' && operation === '/') {
        alert('Nie można dzielić przez zero')
        return
    }
    second = currentScreen.textContent
    currentScreen.textContent = round(calculate(first, second, operation))
    prevScreen.textContent = `${first} ${operation} ${second} =`
    operation = null
}

const calculate = (a, b, operator) => {
    a = Number(a)
    b = Number(b)
    switch(operator) {
        case '+':
            return add(a, b)
        case '-':
            return minus(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            return devide(a, b)
    }
}

const add = (a, b) => {
    return a + b
}

const minus = (a, b) => {
    return a - b
}

const multiply = (a, b) => {
    return a * b
}

const devide = (a, b) => {
    return a / b
}

const round = (num) => {
    return Math.round(num * 1000) / 1000
}

const dot = () => {
    if (currentScreen.textContent.includes('.')) return
    currentScreen.textContent += '.'
}

const resetScreen = () => {
    currentScreen.textContent = ''
    resetScreenValue = false
}

const clearNums = () => {
    currentScreen.textContent = '0'
    prevScreen.textContent = ''
    first = ''
    second = ''
    operation = null
}

const deleteNum = () => {
    if (currentScreen.textContent === '0') return
    currentScreen.textContent = currentScreen.textContent
        .toString()
        .slice(0, -1)
    if (currentScreen.textContent === '') currentScreen.textContent = '0'
}

dotBtn.addEventListener('click', dot)
equalsBtn.addEventListener('click', nextNumber)
clearBtn.addEventListener('click', clearNums)
deleteBtn.addEventListener('click', deleteNum)