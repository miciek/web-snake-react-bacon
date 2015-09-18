export default class Position {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    equals(p) {
        return this.x === p.x && this.y === p.y
    }

    add(p) {
        return new Position(this.x + p.x, this.y + p.y)
    }

    mod(size) {
        return new Position((this.x + size.x) % size.x, (this.y + size.y) % size.y)
    }

    static randomPosition(size) {
        return new Position(
            Math.floor(Math.random() * size.x),
            Math.floor(Math.random() * size.y)
        )
    }

    static rotateRight(pos) {
        return new Position(-pos.y, pos.x)
    }

    static rotateLeft(pos) {
        return new Position(pos.y, -pos.x)
    }
}
