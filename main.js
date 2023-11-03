const infoBtn = document.querySelector('.info')
const legendShadow = document.querySelector('.legend-shadow')
const closeLegendBtn = document.querySelector('.close')

const startGamePanel = document.querySelector('.start-game')
const startGameBtn = document.querySelector('.start-btn')

const gamePanel = document.querySelector('.container')

const player = document.querySelector('.player-img')
const computer = document.querySelector('.computer-img')
const playerPoints = document.querySelector('.player-points')
const computerPoints = document.querySelector('.computer-points')
const options = document.querySelectorAll('.option')

let pPoints = 0
let cPoints = 0

const showLegend = () => {
	if (!(legendShadow.style.display === 'block')) {
		legendShadow.style.display = 'block'
	} else {
		legendShadow.style.display = 'none'
	}

	legendShadow.classList.toggle('legend-animation')
}

const startGame = () => {
	startGamePanel.classList.add('start-game-animation')

	setTimeout(() => {
		startGamePanel.style.display = 'none'
		gamePanel.style.display = 'flex'
		gamePanel.classList.add('container-show-game')
	}, 200)
}

options.forEach(option => {
	option.addEventListener('click', () => {
		player.classList.add('shake-player')
		computer.classList.add('shake-computer')

		setTimeout(() => {
			player.classList.remove('shake-player')
			computer.classList.remove('shake-computer')

			const choice = ['axe', 'shield', 'sword']
			let numbers = Math.floor(Math.random() * 3)

			let computerChoice = choice[numbers]

			player.src = `./img/${option.innerHTML}Player.png`
			computer.src = `./img/${computerChoice}Computer.png`

			if (option.innerHTML === 'shield') {
				if (computerChoice === 'axe') {
					cPoints++
				} else if (computerChoice === 'sword') {
					pPoints++
				} else {
					return
				}
			} else if (option.innerHTML === 'axe') {
				if (computerChoice === 'shield') {
					pPoints++
				} else if (computerChoice === 'sword') {
					cPoints++
				} else {
					return
				}
			} else if (option.innerHTML === 'sword') {
				if (computerChoice === 'shield') {
					cPoints++
				} else if (computerChoice === 'axe') {
					pPoints++
				} else {
					return
				}
			}

			playerPoints.innerHTML = `${pPoints}`
			computerPoints.innerHTML = `${cPoints}`
		}, 900)
	})
})

infoBtn.addEventListener('click', showLegend)
closeLegendBtn.addEventListener('click', showLegend)
window.addEventListener('click', e => (e.target === legendShadow ? showLegend() : false))
startGameBtn.addEventListener('click', startGame)
