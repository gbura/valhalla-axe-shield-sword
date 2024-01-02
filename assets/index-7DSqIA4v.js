;(function () {
	const o = document.createElement('link').relList
	if (o && o.supports && o.supports('modulepreload')) return
	for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e)
	new MutationObserver(e => {
		for (const t of e)
			if (t.type === 'childList')
				for (const i of t.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i)
	}).observe(document, { childList: !0, subtree: !0 })
	function c(e) {
		const t = {}
		return (
			e.integrity && (t.integrity = e.integrity),
			e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
			e.crossOrigin === 'use-credentials'
				? (t.credentials = 'include')
				: e.crossOrigin === 'anonymous'
				? (t.credentials = 'omit')
				: (t.credentials = 'same-origin'),
			t
		)
	}
	function r(e) {
		if (e.ep) return
		e.ep = !0
		const t = c(e)
		fetch(e.href, t)
	}
})()
const L = document.getElementById('song'),
	v = document.getElementById('hit'),
	E = document.getElementById('start-sound'),
	l = document.querySelector('.music-on'),
	d = document.querySelector('.music-off'),
	b = document.querySelector('.info'),
	n = document.querySelector('.legend-shadow'),
	P = document.querySelector('.close'),
	h = document.querySelector('.start-game'),
	k = document.querySelector('.start-btn'),
	g = document.querySelector('.container'),
	a = document.querySelector('.player-img'),
	u = document.querySelector('.computer-img'),
	M = document.querySelector('.player-points'),
	T = document.querySelector('.computer-points'),
	S = document.querySelectorAll('.option'),
	f = document.querySelector('.winner'),
	q = document.querySelector('.restart')
let m = 0,
	y = 0
window.onload = function () {
	l.addEventListener('click', () => {
		l.classList.add('hide'), d.classList.remove('hide'), L.pause()
	}),
		d.addEventListener('click', () => {
			l.classList.remove('hide'), d.classList.add('hide'), L.play()
		})
}
const p = () => {
		n.style.display !== 'block' ? (n.style.display = 'block') : (n.style.display = 'none'),
			n.classList.toggle('legend-animation')
	},
	O = () => {
		E.play(),
			h.classList.add('start-game-animation'),
			setTimeout(() => {
				;(h.style.display = 'none'), (g.style.display = 'flex'), g.classList.add('container-show-game')
			}, 200)
	}
S.forEach(s => {
	s.addEventListener('click', () => {
		v.play(),
			a.classList.add('shake-player'),
			u.classList.add('shake-computer'),
			(s.disabled = !0),
			setTimeout(() => {
				a.classList.remove('shake-player'), u.classList.remove('shake-computer'), (s.disabled = !1)
				const o = ['axe', 'shield', 'sword'],
					c = {
						shield: { axe: 'win', sword: 'lose' },
						axe: { shield: 'lose', sword: 'win' },
						sword: { shield: 'win', axe: 'lose' },
					}
				let r = Math.floor(Math.random() * 3),
					e = o[r]
				;(a.src = `/${s.innerHTML}Player.png`), (u.src = `/${e}Computer.png`)
				const t = c[s.innerHTML][e]
				t === 'win' ? m++ : t === 'lose' && y++,
					(M.innerHTML = `${m}`),
					(T.innerHTML = `${y}`),
					+`${m}` == 10 ? (w(), (f.innerHTML = 'you won!')) : +`${y}` == 10 && (w(), (f.innerHTML = 'you lose!'))
			}, 900)
	})
})
const w = () => {
	S.forEach(s => {
		s.classList.add('hide')
	}),
		f.classList.remove('hide'),
		q.classList.remove('hide')
}
b.addEventListener('click', p)
P.addEventListener('click', p)
window.addEventListener('click', s => (s.target === n ? p() : !1))
k.addEventListener('click', O)
q.addEventListener('click', () => {
	window.location.reload()
})
