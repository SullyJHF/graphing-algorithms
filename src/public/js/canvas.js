export class Canvas {
  constructor(id) {
    this.id = id;
    this.context = null;
    this.width = 0;
    this.height = 0;
    this.init();
  }

  init() {
    this.elm = document.getElementById(this.id);
    if (!this.elm) throw new Error('Canvas element not found!');

    this.elm.width = window.innerWidth;
    this.elm.height = window.innerHeight;
    this.width = this.elm.width;
    this.height = this.elm.height;

    this.context = this.elm.getContext('2d');

    if (!this.context) throw new Error(`Couldn't get graphics context from canvas`);

    this.context.fillRect(0, 0, this.width, this.height);
  }
}
