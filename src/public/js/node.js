export class GraphNode {
  constructor(value) {
    this.x = 0;
    this.y = 0;
    this.radius = 5;
    this.value = value;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.fillStyle = "#EEEEEE";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
