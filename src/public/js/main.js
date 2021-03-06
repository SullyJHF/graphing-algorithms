import { Canvas } from './canvas';
import { Game } from './game';

import { Graph } from './entities/graph';
import { GraphNode } from './entities/graph-node';
import { Edge } from './entities/edge';


const game = new Game();

game.start();

game.on('render', (frameTime) => {
  // render everything in here
});

game.on('update', (tick) => {
  // update state here
});


const MIN_NODES = 2;
const NODE_COUNT = MIN_NODES + Math.floor(Math.random() * 8);
const EDGE_COUNT = Math.ceil(NODE_COUNT * (1 + Math.random() * 1.5));


const canvas = new Canvas('canvas');


const graph = new Graph();
graph.directed = true;

for (let i = 0; i < NODE_COUNT; i++) {
  let node = new GraphNode(i, Math.ceil(Math.random() * 9));
  graph.addNode(node);
}

graph.arrangeNodes(canvas.width, canvas.height);

for (let i = 0; i < EDGE_COUNT; i++) {
  let u = graph.nodes[i % graph.nodes.length];
  let v = graph.nodes[Math.floor(Math.random() * graph.nodes.length)];
  if (u === v) continue;
  graph.addEdge(new Edge(i, u, v));
}


graph.render(canvas.context);
