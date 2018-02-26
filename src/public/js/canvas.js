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

    this.elm.width = window.innerWidth * 2;
    this.elm.height = window.innerHeight * 2;
    this.width = this.elm.width;
    this.height = this.elm.height;
    this.elm.style.width = window.innerWidth + 'px';
    this.elm.style.height = window.innerHeight + 'px';

    this.context = this.elm.getContext('2d');

    if (!this.context) throw new Error(`Couldn't get graphics context from canvas`);

    this.context.fillRect(0, 0, this.width, this.height);
  }

  clear() {
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.width, this.height);
  }
}
