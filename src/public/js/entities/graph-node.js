export class GraphNode {
  constructor(id, value) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.radius = 14;
    this.value = value;
    this.mass = value;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    // Node circle
    ctx.fillStyle = '#EEEEEE';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    // Node text
    ctx.strokeStyle = '#222222';
    ctx.fillStyle = '#222222';
    ctx.font = 'bold 20pt Courier';
    let textMetrics = ctx.measureText(this.value.toString());
    let x = this.x - textMetrics.width / 2;
    let y = this.y + 18 / 2;
    ctx.strokeText(this.id.toString(), x, y);
    ctx.fillText(this.id.toString(), x, y);
  }
}
