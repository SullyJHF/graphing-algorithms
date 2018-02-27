import EventEmitter from 'events';

export class Game extends EventEmitter {
  constructor() {
    super();
    this.animationFrame = null;

    this.tick = this.tick.bind(this);
    let targetUps = 60;
    this.tickLength = 1000 / targetUps;
    this.lastTick = 0;
    this.lastRender = this.lastTick;
    this.running = false;
  }

  start() {
    console.log('Starting loop');

    this.running = true;
    this.lastTick = window.performance.now();
    this.lastRender = this.lastTick
    this.tick(window.performance.now());
  }

  stop() {
    console.log('Stopping loop');

    this.running = false;
    window.cancelAnimationFrame(this.animationFrame);
  }

  tick(frameTime) {
    if (!this.running) return;
    this.animationFrame = window.requestAnimationFrame(this.tick);

    let nextTick = this.lastTick + this.tickLength;
    let tickCount = 0;

    if(frameTime > nextTick) {
      let timeSinceTick = frameTime - this.lastTick;
      tickCount = Math.floor(timeSinceTick / this.tickLength);
    }

    this.queueUpdates(tickCount);
    this.render();
    this.lastRender = frameTime;
  }

  queueUpdates(tickCount) {
    for(let i = 0; i < tickCount; i++) {
      this.lastTick = this.lastTick + this.tickLength; // Now lastTick is this tick.
      this.update(this.tickLength / 1000);
    }
  }

  update(timestep) {
    this.emit('update', timestep);
  }

  render() {
    this.emit('render');
  }
}
