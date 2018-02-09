import { Canvas } from './canvas';

import { Graph } from './entities/graph';
import { GraphNode } from './entities/graph-node';
import { Edge } from './entities/edge';


const NODE_COUNT = 10;
const EDGE_COUNT = 15;

const canvas = new Canvas('canvas');


const graph = new Graph();

for (let i = 0; i < NODE_COUNT; i++) {
  let node = new GraphNode(Math.random() * 100);
  graph.addNode(node);
}

for (let i = 0; i < EDGE_COUNT; i++) {
  let u = graph.nodes[i % graph.nodes.length];
  let v = graph.nodes[Math.floor(Math.random() * graph.nodes.length)];
  graph.addEdge(new Edge(u, v));
}

graph.arrangeNodes(canvas.width, canvas.height);

graph.render(canvas.context);
