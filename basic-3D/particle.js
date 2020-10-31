class Particle {
	constructor() {
		this.pos = createVector(width / 2, height / 2)
		this.rays = []
		this.heading = 0

		for (let index = -10; index < 10; index += 0.1) {
			this.rays.push(new Ray(this.pos, radians(index)))
		}
	}

	move(amt) {
		const vel = p5.Vector.fromAngle(this.heading)
		vel.setMag(amt)
		this.pos.add(vel)
	}

	rotate(angle) {
		this.heading += angle

		this.rays.forEach((ray, i) => ray.setAngle(this.heading))
	}

	update(x, y) {
		this.pos.set(x, y)
	}

	look(walls) {
		let scene = []

		this.rays.forEach((ray, i) => {
			let record = Infinity
			let closest = null

			walls.forEach(wall => {
				const pt = ray.cast(wall) 

				if (pt) {
					const d = p5.Vector.dist(this.pos, pt)
					if (d < record) {
						record = d
						closest = pt
					}
				}
			})

			if (closest) {
				stroke(255, 50)
				line(this.pos.x, this.pos.y, closest.x, closest.y)
			}

			scene[i] = record
		})

		return scene
	}

	show() {
		fill(255)

		// ellipse(this.pos.x, this.pos.y, 1, 1)

		// this.rays.forEach(ray => ray.show())
	}
}