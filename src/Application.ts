import { Layer } from 'common/Layer';
import { LEX } from 'LEX';
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
    this.renderer = new Renderer({ lineRasterizer: new LineRasterizer(), canvas: this.canvas });
    this.stage = new Stage();
    this.uiController = new UIController({
      application: this,
      renderer: this.renderer,
      stage: this.stage,
      canvas: this.canvas
    });
  }

  public init() {
    const polygonLayer = new Layer(LEX.POLYGON_LAYER_NAME);
    this.stage.layers.push(polygonLayer);

    this.uiController.init();
  }

  public render() {
    this.renderer.clear();
    this.stage.render(this.renderer);
    this.uiController.update();
  }
}
