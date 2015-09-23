export default class Vector {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    equals(p) {
        return this.x === p.x && this.y === p.y
    }

    add(p) {
        return new Vector(this.x + p.x, this.y + p.y)
    }

    mod(size) {
        return new Vector((this.x + size.x) % size.x, (this.y + size.y) % size.y)
    }

    static random(size) {
        return new Vector(
            Math.floor(Math.random() * size.x),
            Math.floor(Math.random() * size.y)
        )
    }

    static rotateRight(pos) {
        return new Vector(-pos.y, pos.x)
    }

    static rotateLeft(pos) {
        return new Vector(pos.y, -pos.x)
    }
}
