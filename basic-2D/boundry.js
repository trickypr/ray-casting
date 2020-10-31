class Boundry {
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1)
        this.b = createVector(x2, y2)
    }

    show() {
        const { a, b } = this

        stroke(255)
        line(a.x, a.y, b.x, b.y)
    }
}