export class UIController {
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.onClick = this.onClick.bind(this);
  }

  public init() {
    this.canvas.addEventListener('click', this.onClick);
  }

  public destroy() {
    this.canvas.removeEventListener('click', this.onClick);
  }

  private onClick(event: MouseEvent) {
    const x = event.pageX - this.canvas.offsetLeft;
    const y = event.pageY - this.canvas.offsetTop;

    console.log('clicked at', x, y);
  }
}
