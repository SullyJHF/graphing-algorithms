export class Canvas {
  constructor(id) {
    this.id = id;
    this.context = null;
    this.width = 0;
    this.height = 0;
    this.init();
  }

  init() {
    this.elm = document.getElementById(this.id);
    if (!this.elm) throw new Error('Canvas element not found!');

    this.elm.width = window.innerWidth * 2;
    this.elm.height = window.innerHeight * 2;
    this.width = this.elm.width;
    this.height = this.elm.height;
    this.elm.style.width = window.innerWidth + 'px';
    this.elm.style.height = window.innerHeight + 'px';

    this.context = this.elm.getContext('2d');

    if (!this.context) throw new Error(`Couldn't get graphics context from canvas`);

    this.clear();
  }

  clear() {
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.width, this.height);
  }

  // Rendering
  renderEdge(edge, spring) {
    this.context.strokeStyle = '#EEEEEE';
    this.context.lineWidth = 2;

    // stroke line
    this.context.beginPath();
    this.context.moveTo(spring.point1.p.x + this.width / 2, spring.point1.p.y + this.height / 2);
    this.context.lineTo(spring.point2.p.x + this.width / 2, spring.point2.p.y + this.height / 2);
    this.context.stroke();
    this.context.closePath();


    let arrowAngle = Math.PI / 10;
    let arrowLength = 30;

    let width = spring.point2.p.x - spring.point1.p.x;
    let height = spring.point2.p.y - spring.point1.p.y;

    let edgeAngle = Math.PI + Math.atan2(height, width);

    let branchAAngle = edgeAngle + arrowAngle;
    let branchBAngle = edgeAngle - arrowAngle;

    let arrowBranchAX = Math.cos(branchAAngle) * arrowLength + spring.point2.p.x + this.width / 2;
    let arrowBranchAY = Math.sin(branchAAngle) * arrowLength + spring.point2.p.y + this.height / 2;

    let arrowBranchBX = Math.cos(branchBAngle) * arrowLength + spring.point2.p.x + this.width / 2;
    let arrowBranchBY = Math.sin(branchBAngle) * arrowLength + spring.point2.p.y + this.height / 2;

    this.context.beginPath();
    this.context.moveTo(spring.point2.p.x + this.width / 2, spring.point2.p.y + this.height / 2);
    this.context.lineTo(arrowBranchAX, arrowBranchAY);
    this.context.moveTo(spring.point2.p.x + this.width / 2, spring.point2.p.y + this.height / 2);
    this.context.lineTo(arrowBranchBX, arrowBranchBY);
    this.context.lineTo(arrowBranchAX, arrowBranchAY);
    this.context.fillStyle = '#EEEEEE';
    this.context.fill();
    this.context.closePath();
  }

  renderNode(node, point) {
    // Node circle
    this.context.fillStyle = '#EEEEEE';
    this.context.beginPath();

    this.context.arc(point.p.x + this.width / 2, point.p.y + this.height / 2, node.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();

    // Node text
    this.context.strokeStyle = '#222222';
    this.context.fillStyle = '#222222';
    this.context.font = 'bold 20pt Courier';
    let textMetrics = this.context.measureText(node.mass.toString());
    let x = point.p.x - textMetrics.width / 2.0 + this.width / 2.0;
    let y = point.p.y + 18 / 2.0 + this.height / 2.0;
    this.context.strokeText(node.mass, x, y);
    this.context.fillText(node.mass, x, y);
  }
}
