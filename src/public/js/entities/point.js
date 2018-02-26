import { Vector } from './vector';

export class Point {
  constructor(position, mass) {
    this.p = position; // position
    this.m = mass; // mass
    this.v = new Vector(0, 0); // velocity
    this.a = new Vector(0, 0); // acceleration
  }

  applyForce(force) {
    this.a = this.a.add(force.divide(this.m));
  }

  render(canvas, value) {
        // Node circle
    canvas.context.fillStyle = '#EEEEEE';
    canvas.context.beginPath();
    // 5 is the radius here
    canvas.context.arc(this.p.x + canvas.width / 2, this.p.y + canvas.height / 2, 14, 0, 2 * Math.PI);
    canvas.context.fill();
    canvas.context.closePath();

    // Node text
    canvas.context.strokeStyle = '#222222';
    canvas.context.fillStyle = '#222222';
    canvas.context.font = 'bold 20pt Courier';
    let textMetrics = canvas.context.measureText(value.toString());
    let x = this.p.x - textMetrics.width / 2.0 + canvas.width / 2.0;
    let y = this.p.y + 18 / 2.0 + canvas.height / 2.0;
    canvas.context.strokeText(value, x, y);
    canvas.context.fillText(value, x, y);
  }
}
