import { Vector } from './vector';
import { Point } from './point';
import { Spring } from './spring';

export class Layout {
  constructor(graph, stiffness, repulsion, damping, minEnergyThreshold, maxSpeed) {
    this.graph = graph;
    this.stiffness = stiffness; // spring stiffness constant
    this.repulsion = repulsion; // repulsion constant
    this.damping = damping; // velocity damping factor
    this.minEnergyThreshold = minEnergyThreshold || 0.01; //threshold used to determine render stop
    this.maxSpeed = maxSpeed || Infinity; // nodes aren't allowed to exceed this speed

    this.nodePoints = {}; // keep track of points associated with nodes
    this.edgeSprings = {}; // keep track of springs associated with edges
  }

  tick(timestep) {
    this.applyCoulombsLaw();
    this.applyHookesLaw();
    this.attractToCentre();
    this.updateVelocity(timestep);
    this.updatePosition(timestep);
  }

  point(node) {
    if (!(node.id in this.nodePoints)) {
      var mass = (node.mass !== undefined) ? node.mass : 1.0;
      this.nodePoints[node.id] = new Point(Vector.random(), mass);
    }

    return this.nodePoints[node.id];
  }

  spring(edge) {
    if (!(edge.id in this.edgeSprings)) {
      var length = (edge.length !== undefined) ? edge.length : 1.0;

      var existingSpring = false;

      var from = this.graph.getEdges(edge.u, edge.v);
      from.forEach((e) => {
        if (existingSpring === false && e.id in this.edgeSprings) {
          existingSpring = this.edgeSprings[e.id];
        }
      });

      if (existingSpring !== false) {
        return new Spring(existingSpring.point1, existingSpring.point2, 0.0, 0.0);
      }

      var to = this.graph.getEdges(edge.u, edge.v);
      from.forEach((e) => {
        if (existingSpring === false && e.id in this.edgeSprings) {
          existingSpring = this.edgeSprings[e.id];
        }
      });

      if (existingSpring !== false) {
        return new Spring(existingSpring.point2, existingSpring.point1, 0.0, 0.0);
      }

      this.edgeSprings[edge.id] = new Spring(
        this.point(edge.u), this.point(edge.v), length, this.stiffness
      );
    }

    return this.edgeSprings[edge.id];
  }

  // callback should accept two arguments: Node, Point
  eachNode(callback) {
    var t = this;
    this.graph.nodes.forEach((n) => {
      callback.call(t, n, t.point(n));
    });
  }

  // callback should accept two arguments: Edge, Spring
  eachEdge(callback) {
    var t = this;
    this.graph.edges.forEach((e) => {
      callback.call(t, e, t.spring(e));
    });
  }

  // callback should accept one argument: Spring
  eachSpring(callback) {
    var t = this;
    this.graph.edges.forEach((e) => {
      callback.call(t, t.spring(e));
    });
  }


    // Physics stuff
  applyCoulombsLaw() {
    this.eachNode(function(n1, point1) {
      this.eachNode(function(n2, point2) {
        if (point1 !== point2)
        {
          var d = point1.p.subtract(point2.p);
          var distance = d.magnitude() + 0.1; // avoid massive forces at small distances (and divide by zero)
          var direction = d.normalise();

          // apply force to each end point
          point1.applyForce(direction.multiply(this.repulsion).divide(distance * distance * 0.5));
          point2.applyForce(direction.multiply(this.repulsion).divide(distance * distance * -0.5));
        }
      });
    });
  }

  applyHookesLaw() {
    this.eachSpring(function(spring){
      var d = spring.point2.p.subtract(spring.point1.p); // the direction of the spring
      var displacement = spring.length - d.magnitude();
      var direction = d.normalise();

      // apply force to each end point
      spring.point1.applyForce(direction.multiply(spring.k * displacement * -0.5));
      spring.point2.applyForce(direction.multiply(spring.k * displacement * 0.5));
    });
  }

  attractToCentre() {
    this.eachNode(function(node, point) {
      var direction = point.p.multiply(-1.0);
      point.applyForce(direction.multiply(this.repulsion / 50.0));
    });
  }


  updateVelocity(timestep) {
    this.eachNode(function(node, point) {
      point.v = point.v.add(point.a.multiply(timestep)).multiply(this.damping);
      if (point.v.magnitude() > this.maxSpeed) {
          point.v = point.v.normalise().multiply(this.maxSpeed);
      }
      point.a = new Vector(0,0);
    });
  }

  updatePosition(timestep) {
    this.eachNode(function(node, point) {
      point.p = point.p.add(point.v.multiply(timestep));
    });
  }

  // Calculate the total kinetic energy of the system
  totalEnergy(timestep) {
    var energy = 0.0;
    this.eachNode(function(node, point) {
      var speed = point.v.magnitude();
      energy += 0.5 * point.m * speed * speed;
    });

    return energy;
  }

}
