import { Application } from 'Application';
import { COLORS } from 'common/COLORS';
import { Layer } from 'common/Layer';
import { LineProperties } from 'common/LineProperties';
import { Path } from 'common/Path';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';
import { Renderer } from 'Renderer';
import { Stage } from 'Stage';
import { PathPointComponent } from 'ui/components/PathPointComponent';
import { MousePositionTransformer } from 'ui/MousePositionTransformer';
import { NewPolygonUIController } from 'ui/NewPolygonUIController';

interface UIControllerDependencies {
  canvas: HTMLCanvasElement;
  application: Application;
  renderer: Renderer;
  stage: Stage;
}

export class UIController {
  private readonly canvas: HTMLCanvasElement;
  private readonly application: Application;
  private readonly renderer: Renderer;
  private readonly stage: Stage;

  private readonly polygonLayer = new Layer('PolygonLayer');

  private mousePositionTransformer: MousePositionTransformer;
  private applicationUIContainer: HTMLElement;
  private newPolygonUIController: NewPolygonUIController;

  constructor(dependencies: UIControllerDependencies) {
    this.canvas = dependencies.canvas;
    this.application = dependencies.application;
    this.renderer = dependencies.renderer;
    this.stage = dependencies.stage;

    this.onClick = this.onClick.bind(this);
  }

  public init() {
    const applicationUIContainer = document.getElementById('application-ui');
    if (!applicationUIContainer) {
      throw new Error('Application UI container not found');
    }

    this.applicationUIContainer = applicationUIContainer;
    this.stage.layers.push(this.polygonLayer);

    this.mousePositionTransformer = new MousePositionTransformer(this.canvas);

    this.newPolygonUIController = new NewPolygonUIController({
      application: this.application,
      applicationUIContainer: this.applicationUIContainer,
      canvas: this.canvas,
      stage: this.stage,
      polygonLayer: this.polygonLayer,
      renderer: this.renderer,
      mousePositionTransformer: this.mousePositionTransformer
    });
    this.newPolygonUIController.init();

    this.canvas.addEventListener('click', this.onClick);
  }

  public destroy() {
    this.canvas.removeEventListener('click', this.onClick);
    this.newPolygonUIController.destroy();

    this.stage.removeLayer(this.polygonLayer);
  }

  private onClick(event: MouseEvent) {
    const point = this.mousePositionTransformer.getPointFromMouseEvent(event);

    const hitTestResult = this.stage.hitTest(point);

    if (!hitTestResult) {
      return this.newPolygonUIController.addNewPoint(point);
    }

    console.log('Hit test result', hitTestResult);
  }
}
