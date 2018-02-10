import { GraphNode } from './graph-node';


export class Edge {
  constructor(u, v) {
    if (!(u instanceof GraphNode) || !(v instanceof GraphNode)) throw new Error('edge nodes must be instances of GraphNode');
    if (u === v) throw new Error('u and v cannot be the same node');
    this.u = u;
    this.v = v;
    this.weight = Math.random() * 100;
    this.directed = false;
    this.arrowAngle = Math.PI / 10;
    this.arrowLength = 30;
    this.arrowFill = true;
  }

  render(ctx) {
    ctx.strokeStyle = '#EEEEEE';
    ctx.lineWidth = 2;

    // stroke line
    ctx.beginPath();
    ctx.moveTo(this.u.x, this.u.y);
    ctx.lineTo(this.v.x, this.v.y);
    ctx.stroke();
    ctx.closePath();

    // stroke arrow
    if (!this.directed) return;

    let width = this.v.x - this.u.x;
    let height = this.v.y - this.u.y;

    let edgeAngle = Math.PI + Math.atan2(height, width);

    let branchAAngle = edgeAngle + this.arrowAngle;
    let branchBAngle = edgeAngle - this.arrowAngle;
    let arrowBranchAX = Math.cos(branchAAngle) * this.arrowLength + this.v.x;
    let arrowBranchAY = Math.sin(branchAAngle) * this.arrowLength + this.v.y;

    let arrowBranchBX = Math.cos(branchBAngle) * this.arrowLength + this.v.x;
    let arrowBranchBY = Math.sin(branchBAngle) * this.arrowLength + this.v.y;
    ctx.beginPath();
    ctx.moveTo(this.v.x, this.v.y);
    ctx.lineTo(arrowBranchAX, arrowBranchAY);
    ctx.moveTo(this.v.x, this.v.y);
    ctx.lineTo(arrowBranchBX, arrowBranchBY);
    if (this.arrowFill) {
      ctx.lineTo(arrowBranchAX, arrowBranchAY);
      ctx.fillStyle = '#EEEEEE';
      ctx.fill();
    } else {
      ctx.stroke();
    }
    ctx.closePath();
  }
}
