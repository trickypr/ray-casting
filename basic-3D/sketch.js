const sceneW = 400
const sceneH = 400

let particle

let render = []
let walls = []

let xoff = 0
let yoff = 1000

let averageCalcTime = 0
let averageCalcSamples = 0
let calcTimeEl

function averageAdd(val) {
	averageCalcTime *= averageCalcSamples
	averageCalcTime += val
	averageCalcSamples++
	averageCalcTime /= averageCalcSamples
	calcTimeEl.innerText = averageCalcTime.toFixed(2)
}

function setup() {
	createCanvas(800, 400)

	calcTimeEl = document.getElementById('calc')

	for (let i = 0; i < 5; i++) {
		const wall = new Boundary(random(sceneW), random(sceneH), random(sceneW), random(sceneH))
		
		walls.push(wall)
	}

	walls.push(new Boundary(0, 0, sceneW, 0))
	walls.push(new Boundary(sceneW, 0, sceneW, sceneH))
	walls.push(new Boundary(sceneW, sceneH, 0, sceneH))
	walls.push(new Boundary(0, sceneH, 0, 0))
	render = [...render, ...walls]

	particle = new Particle()
	particle.update(sceneW / 2, sceneH / 2)

	render.push(particle)
}

function draw() {
	if (keyIsDown(LEFT_ARROW)) {
		particle.rotate(-0.05)
	} else if (keyIsDown(RIGHT_ARROW)) {
		particle.rotate(0.05)
	}

	if (keyIsDown(UP_ARROW)) {
		particle.move(1)
	} else if (keyIsDown(DOWN_ARROW)) {
		particle.move(-1)
	}

	background(0)

	render.forEach(el => el.show())

	const t1 = performance.now()
	const scene = particle.look(walls)
	const t2 = performance.now()
	averageAdd(t2 - t1)

	push()
	translate(sceneW, 0)

	const w = sceneW / scene.length
	scene.forEach((point, i) => {
		const sq = point ** 2
		const wSq = sceneW ** 2
		const b = map(sq, 0, wSq, 255, 0)
		const h = map(point, 0, sceneW, sceneH, 0)

		fill(b)
		noStroke()
		
		rectMode(CENTER)
		rect(i * w + w / 2, sceneH / 2, w + 1, h)
	})

	pop()
}
