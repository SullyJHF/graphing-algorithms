export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.animationFrame = null;
  }

  start() {
    this.animationFrame = window.requestAnimationFrame(this.start);
    this.canvas.render()
  }

  stop() {
    window.cancelAnimationFrame(this.animateFrame);
  }
}
