class Particle {
	constructor() {
		this.pos = createVector(width / 2, height / 2)
		this.rays = []

		for (let index = 0; index < 360; index += 2) {
			this.rays.push(new Ray(this.pos, radians(index)))
		}
	}

	update(x, y) {
		this.pos.set(x, y)
	}

	look(walls) {
		this.rays.forEach(ray => {
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
		})
	}

	show() {
		fill(255)

		ellipse(this.pos.x, this.pos.y, 1, 1)

		this.rays.forEach(ray => ray.show())
	}
}