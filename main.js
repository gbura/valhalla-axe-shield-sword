const song = document.getElementById('song')
const hitSound = document.getElementById('hit')
const startrestartSound = document.getElementById('start-sound')
const musicOnIcon = document.querySelector('.music-on')
const musicOffIcon = document.querySelector('.music-off')

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

const winnerText = document.querySelector('.winner')
const restartBtn = document.querySelector('.restart')
const pointsBox = document.querySelector('.points')

let pPoints = 0
let cPoints = 0

window.onload = function () {
	musicOnIcon.addEventListener('click', () => {
		musicOnIcon.classList.add('hide')
		musicOffIcon.classList.remove('hide')
		song.pause()
	})

	musicOffIcon.addEventListener('click', () => {
		musicOnIcon.classList.remove('hide')
		musicOffIcon.classList.add('hide')
		song.play()
	})
}

const showLegend = () => {
	if (!(legendShadow.style.display === 'block')) {
		legendShadow.style.display = 'block'
	} else {
		legendShadow.style.display = 'none'
	}

	legendShadow.classList.toggle('legend-animation')
}

const startGame = () => {
	startrestartSound.play()
	startGamePanel.classList.add('start-game-animation')

	setTimeout(() => {
		startGamePanel.style.display = 'none'
		gamePanel.style.display = 'flex'
		gamePanel.classList.add('container-show-game')
	}, 200)
}

options.forEach(option => {
	option.addEventListener('click', () => {
		hitSound.play()
		player.classList.add('shake-player')
		computer.classList.add('shake-computer')
		option.disabled = true

		setTimeout(() => {
			player.classList.remove('shake-player')
			computer.classList.remove('shake-computer')
			option.disabled = false

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

			if (`${pPoints}` == 10) {
				endGame()
				winnerText.innerHTML = 'you won!'
			} else if (`${cPoints}` == 10) {
				endGame()
				winnerText.innerHTML = 'you lose!'
			}
		}, 900)
	})
})

const endGame = () => {
	options.forEach(option => {
		option.classList.add('hide')
	})
	winnerText.classList.remove('hide')
	restartBtn.classList.remove('hide')
}

infoBtn.addEventListener('click', showLegend)
closeLegendBtn.addEventListener('click', showLegend)
window.addEventListener('click', e => (e.target === legendShadow ? showLegend() : false))
startGameBtn.addEventListener('click', startGame)
restartBtn.addEventListener('click', () => {
	window.location.reload()
})
