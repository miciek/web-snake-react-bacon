export default class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    equals(v) {
        return this.x === v.x && this.y === v.y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    mod(size) {
        return new Vector((this.x + size.x) % size.x, (this.y + size.y) % size.y);
    }

    static random(size) {
        return new Vector(
            Math.floor(Math.random() * size.x),
            Math.floor(Math.random() * size.y)
        );
    }

    static rotateRight(vec) {
        return new Vector(-vec.y, vec.x);
    }

    static rotateLeft(vec) {
        return new Vector(vec.y, -vec.x);
    }
}
