import './styles/style.css'

const song = <HTMLAudioElement>document.getElementById('song')
const hitSound = <HTMLAudioElement>document.getElementById('hit')
const startSound = <HTMLAudioElement>document.getElementById('start-sound')
const musicOnIcon = <HTMLParagraphElement>document.querySelector('.music-on')
const musicOffIcon = <HTMLParagraphElement>document.querySelector('.music-off')

const infoBtn = <HTMLParagraphElement>document.querySelector('.info')
const legendShadow = <HTMLDivElement>document.querySelector('.legend-shadow')
const closeLegendBtn = <HTMLButtonElement>document.querySelector('.close')

const startGamePanel = <HTMLDivElement>document.querySelector('.start-game')
const startGameBtn = <HTMLButtonElement>document.querySelector('.start-btn')

const gamePanel = <HTMLDivElement>document.querySelector('.container')

const player = <HTMLImageElement>document.querySelector('.player-img')
const computer = <HTMLImageElement>document.querySelector('.computer-img')
const playerPoints = <HTMLSpanElement>document.querySelector('.player-points')
const computerPoints = <HTMLSpanElement>document.querySelector('.computer-points')
const options: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.option')
const winnerText = <HTMLParagraphElement>document.querySelector('.winner')
const restartBtn = <HTMLButtonElement>document.querySelector('.restart')

let pPoints: number = 0
let cPoints: number = 0

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
	startSound.play()
	startGamePanel.classList.add('start-game-animation')

	setTimeout(() => {
		startGamePanel.style.display = 'none'
		gamePanel.style.display = 'flex'
		gamePanel.classList.add('container-show-game')
	}, 200)
}

type Outcomes = {
	[atacker: string]: {
		[defender: string]: string
	}
}

options.forEach((option: HTMLButtonElement) => {
	option.addEventListener('click', () => {
		hitSound.play()
		player.classList.add('shake-player')
		computer.classList.add('shake-computer')
		option.disabled = true

		setTimeout(() => {
			player.classList.remove('shake-player')
			computer.classList.remove('shake-computer')
			option.disabled = false

			const choice: string[] = ['axe', 'shield', 'sword']
			const outcomes: Outcomes = {
				shield: { axe: 'win', sword: 'lose' },
				axe: { shield: 'lose', sword: 'win' },
				sword: { shield: 'win', axe: 'lose' },
			}

			let numbers: number = Math.floor(Math.random() * 3)
			let computerChoice: string = choice[numbers]

			player.src = `./src/assets/img/${option.innerHTML}Player.png`
			computer.src = `./src/assets/img/${computerChoice}Computer.png`

			const outcome: string = outcomes[option.innerHTML][computerChoice]

			if (outcome === 'win') {
				pPoints++
			} else if (outcome === 'lose') {
				cPoints++
			}

			playerPoints.innerHTML = `${pPoints}`
			computerPoints.innerHTML = `${cPoints}`

			if (Number(`${pPoints}`) === 10) {
				endGame()
				winnerText.innerHTML = 'you won!'
			} else if (Number(`${cPoints}`) === 10) {
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
