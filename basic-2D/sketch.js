// This code is based of the related video for the coding train

let wall
let particle

let render = []
let walls = []

let xoff = 0
let yoff = 1000

function setup() {
	createCanvas(innerWidth, innerHeight)

	for (let i = 0; i < 5; i++) {
		const wall = new Boundry(random(width), random(height), random(width), random(height))
		
		walls.push(wall)
		render.push(wall)
	}

	walls.push(new Boundry(0, 0, width, 0))
	walls.push(new Boundry(width, 0, width, height))
	walls.push(new Boundry(width, height, 0, height))
	walls.push(new Boundry(0, height, 0, 0))

	particle = new Particle()

	render.push(particle)
}

function draw() {
	background(0)

	particle.update(noise(xoff) * width, noise(yoff) * height)

	render.forEach(el => el.show())
	particle.look(walls)

	xoff += 0.01
	yoff += 0.01
}
