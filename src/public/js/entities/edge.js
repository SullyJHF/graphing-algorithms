import { GraphNode } from './graph-node';


export class Edge {
  constructor(id, u, v, maxLength) {
    if (!(u instanceof GraphNode) || !(v instanceof GraphNode)) throw new Error('edge nodes must be instances of GraphNode');
    if (u === v) throw new Error('u and v cannot be the same node');
    this.id = id;
    this.u = u;
    this.v = v;
    this.weight = 100 + Math.random() * maxLength / 3;
    this.length = this.weight;
  }
}
