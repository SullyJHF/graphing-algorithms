import { GraphNode } from './graph-node';


export class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this.nodeSet = {};
    this.adjacency = {};
    this.directed = false;
  }

  addNode(node) {
    if (!(node instanceof GraphNode)) throw new Error('node must be of type GraphNode');
    if (!(node.id in this.nodeSet)) this.nodes.push(node);
    this.nodeSet[node.id] = node;
    return node;
  }

  addEdge(edge) {
    if (!(edge.u.id in this.nodeSet) || !(edge.v.id in this.nodeSet)) throw new Error('both nodes of an edge must already be part of this graph');
    if (this.edges.includes(edge.id)) return;

    if (!(edge.u.id in this.adjacency)) {
      this.adjacency[edge.u.id] = {};
    }

    if (!(edge.v.id in this.adjacency[edge.u.id])) {
      this.adjacency[edge.u.id][edge.v.id] = [];
    }

    if (!this.adjacency[edge.u.id][edge.v.id].includes(edge)) {
      this.adjacency[edge.u.id][edge.v.id].push(edge);
    }

    edge.directed = this.directed;

    this.edges.push(edge);
  }

  getEdges(node1, node2) {
    if (node1.id in this.adjacency && node2.id in this.adjacency[node1.id]) {
      return this.adjacency[node1.id][node2.id];
    }

    return [];
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
    for (let edge of this.edges) {
      edge.render(ctx);
    }

    for (let node of this.nodes) {
      node.render(ctx);
    }
  }
}
