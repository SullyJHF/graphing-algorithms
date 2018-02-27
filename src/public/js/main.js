import { Canvas } from './canvas';
import { Game } from './game';
import { Layout } from './entities/layout';

import { Graph } from './entities/graph';
import { GraphNode } from './entities/graph-node';
import { Edge } from './entities/edge';



const MIN_NODES = 3;
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
  graph.addEdge(new Edge(i, u, v, canvas.width));
}

var layout = new Layout(graph, 400.0, 400.0, 0.5, 50);


const game = new Game();

game.start();

game.on('render', () => {
  canvas.clear();

  layout.eachEdge(function(edge, spring) {
    canvas.renderEdge(edge, spring);
  });

  layout.eachNode(function(node, point) {
    canvas.renderNode(node, point);
  });
});

game.on('update', (timestep) => {
  // update state here
  layout.tick(timestep);

  if (layout.totalEnergy(timestep) < layout.minEnergyThreshold) {
    game.stop();
  }
});


// graph.render(canvas.context);
