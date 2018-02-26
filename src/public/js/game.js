import EventEmitter from 'events';

export class Game extends EventEmitter {
  constructor() {
    super();
    this.animationFrame = null;

    this.tick = this.tick.bind(this);
    this.tickLength = 20;
    this.lastTick = 0;
    this.lastRender = this.lastTick;
  }

  start() {
    console.log('Starting loop');

    this.lastTick = window.performance.now();
    this.lastRender = this.lastTick
    this.tick(window.performance.now());
  }

  stop() {
    console.log('Stopping loop');

    window.cancelAnimationFrame(this.animationFrame);
  }

  tick(frameTime) {
    this.animationFrame = window.requestAnimationFrame(this.tick);

    let nextTick = this.lastTick + this.tickLength;
    let tickCount = 0;

    if(frameTime > nextTick) {
      let timeSinceTick = frameTime - this.lastTick;
      tickCount = Math.floor(timeSinceTick / this.tickLength);
    }

    this.queueUpdates(tickCount);
    this.render(frameTime);
    this.lastRender = frameTime;
  }

  queueUpdates(tickCount) {
    for(let i = 0; i < tickCount; i++) {
      this.lastTick = this.lastTick + this.tickLength; // Now lastTick is this tick.
      this.update(this.tickLength / 1000);
    }
  }

  update(tick) {
    this.emit('update', tick);
  }

  render(frameTime) {
    this.emit('render', frameTime);
  }
}
