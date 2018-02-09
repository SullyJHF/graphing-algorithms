import { GraphNode } from './graph-node';


export class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  addNode(node) {
    if (!(node instanceof GraphNode)) throw new Error('node must be of type GraphNode');
    this.nodes.push(node);
  }

  addEdge(edge) {
    if (!this.nodes.includes(edge.u) || !this.nodes.includes(edge.v)) throw new Error('both nodes of an edge must already be part of this graph');
    if (this.edges.includes(edge)) return;
    this.edges.push(edge);
  }

  arrangeNodes(width, height) {
    let middle = {
      x: width / 2,
      y: height / 2
    };

    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      let x = Math.random() * width;
      let y = Math.random() * height;
      node.setPosition(x, y);
    }
  }

  render(ctx) {
    for (let node of this.nodes) {
      node.render(ctx);
    }

    for (let edge of this.edges) {
      edge.render(ctx);
    }
  }
}
