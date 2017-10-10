import { LineRasterizer } from 'line-rasterizer/LineRasterizer';
import { Renderer } from 'Renderer';
import { Stage } from 'Stage';
import { UIController } from 'ui/UIController';

export class Application {
  private canvas: HTMLCanvasElement;
  private renderer: Renderer;
  private uiController: UIController;
  private stage: Stage;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new Renderer(this.canvas, { lineRasterizer: new LineRasterizer() });
    this.stage = new Stage(this.canvas);
    this.uiController = new UIController(this.canvas, { application: this, renderer: this.renderer, stage: this.stage });
  }

  public init() {
    this.uiController.init();
  }

  public render() {
    this.renderer.clear();
    this.stage.polygons.forEach(polygon => this.renderer.drawPolygon(polygon));
  }
}
