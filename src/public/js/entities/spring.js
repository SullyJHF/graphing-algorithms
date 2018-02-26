export class Spring {
  constructor(point1, point2, length, k) {
    this.point1 = point1;
    this.point2 = point2;
    this.length = length; // spring length at rest
    this.k = k; // spring constant (See Hooke's law) .. how stiff the spring is
  }

  render(canvas) {
    canvas.context.strokeStyle = '#EEEEEE';
    canvas.context.lineWidth = 2;

    // stroke line
    canvas.context.beginPath();
    canvas.context.moveTo(this.point1.p.x + canvas.width / 2, this.point1.p.y + canvas.height / 2);
    canvas.context.lineTo(this.point2.p.x + canvas.width / 2, this.point2.p.y + canvas.height / 2);
    canvas.context.stroke();
    canvas.context.closePath();

    // stroke arrow
    // if (!this.directed) return;


    let arrowAngle = Math.PI / 10;
    let arrowLength = 30;

    let width = this.point2.p.x - this.point1.p.x;
    let height = this.point2.p.y - this.point1.p.y;

    let edgeAngle = Math.PI + Math.atan2(height, width);

    let branchAAngle = edgeAngle + arrowAngle;
    let branchBAngle = edgeAngle - arrowAngle;

    let arrowBranchAX = Math.cos(branchAAngle) * arrowLength + this.point2.p.x + canvas.width / 2;
    let arrowBranchAY = Math.sin(branchAAngle) * arrowLength + this.point2.p.y + canvas.height / 2;

    let arrowBranchBX = Math.cos(branchBAngle) * arrowLength + this.point2.p.x + canvas.width / 2;
    let arrowBranchBY = Math.sin(branchBAngle) * arrowLength + this.point2.p.y + canvas.height / 2;

    canvas.context.beginPath();
    canvas.context.moveTo(this.point2.p.x + canvas.width / 2, this.point2.p.y + canvas.height / 2);
    canvas.context.lineTo(arrowBranchAX, arrowBranchAY);
    canvas.context.moveTo(this.point2.p.x + canvas.width / 2, this.point2.p.y + canvas.height / 2);
    canvas.context.lineTo(arrowBranchBX, arrowBranchBY);
      canvas.context.lineTo(arrowBranchAX, arrowBranchAY);
      canvas.context.fillStyle = '#EEEEEE';
      canvas.context.fill();
    canvas.context.closePath();
  }
}
