import { GraphNode } from './graph-node';


export class Edge {
  constructor(u, v) {
    if (!(u instanceof GraphNode) || !(v instanceof GraphNode)) throw new Error('edge nodes must be instances of GraphNode');
    this.u = u;
    this.v = v;
    this.weight = Math.random() * 100;
  }

  render(ctx) {
    ctx.strokeStyle = '#EEEEEE';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.u.x, this.u.y);
    ctx.lineTo(this.v.x, this.v.y);
    ctx.stroke();
    ctx.closePath();
  }
}
