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
}
