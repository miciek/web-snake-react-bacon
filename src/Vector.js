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

  mod(max) {
    return new Vector((this.x + max.x) % max.x, (this.y + max.y) % max.y);
  }

  static random(max) {
    return new Vector(Math.floor(Math.random() * max.x), Math.floor(Math.random() * max.y));
  }

  static rotateRight(vec) {
    return new Vector(-vec.y, vec.x);
  }

  static rotateLeft(vec) {
    return new Vector(vec.y, -vec.x);
  }
}
