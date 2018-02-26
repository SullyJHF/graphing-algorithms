export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static random() {
    return new Vector(10.0 * (Math.random() - 0.5), 10.0 * (Math.random() - 0.5));
  }

  add(v2) {
    return new Vector(this.x + v2.x, this.y + v2.y);
  }

  subtract(v2) {
    return new Vector(this.x - v2.x, this.y - v2.y);
  }

  multiply(n) {
    return new Vector(this.x * n, this.y * n);
  }

  divide(n) {
    return new Vector((this.x / n) || 0, (this.y / n) || 0); // Avoid divide by zero errors..
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normal() {
    return new Vector(-this.y, this.x);
  }

  normalise() {
    return this.divide(this.magnitude());
  }
}
