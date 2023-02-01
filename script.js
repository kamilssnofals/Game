const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeCount = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0
let score = 0

const colors = [
	'#E2D1F9',
	'#317773',
	'teal',
	'#990011FF',
	'#FCF6F5FF',
	'#8AAAE5',
	'#FF69B4',
	'#00FFFF',
	'#FCEDDA',
	'#ADD8E6',
]

startBtn.addEventListener('click', e => {
	e.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', e => {
	if (e.target.classList.contains('time-btn')) {
		time = parseInt(e.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', e => {
	if (e.target.classList.contains('circle')) {
		score++
		e.target.remove()
		createRandomCircle()
	}
})

const startGame = () => {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}

const decreaseTime = () => {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}
}

const setTime = value => {
	timeCount.innerHTML = `00:${value}`
}

const finishGame = () => {
	timeCount.parentNode.remove()
	board.innerHTML = `<h1>Счет:<span class='primary'>${score}<span></h1>`
}

const createRandomCircle = () => {
	const circle = document.createElement('div')
	circle.addEventListener('mouseover', () => setColor(circle))
 
	const size = getRandomNumber(10, 60)

	const { width, height } = board.getBoundingClientRect()

	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`
	board.append(circle)
}

const setColor = el => {
	el.style.background = getRandomColors()
}

const getRandomColors = () => {
	const index = Math.floor(Math.random() * colors.length)
	return colors[index]
}

const getRandomNumber = (max, min) => {
	return Math.round(Math.random() * (max - min) + min)
}
