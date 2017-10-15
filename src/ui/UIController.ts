import { Application } from 'Application';
import { HitTestResult } from 'common/HitTestResult';
import { configuration } from 'configuration';
import { LEX } from 'LEX';
import { Renderer } from 'Renderer';
import { Stage } from 'Stage';
import { MousePositionTransformer } from 'ui/MousePositionTransformer';
import { NewPolygonUIController } from 'ui/NewPolygonUIController';
import { PointSyncService } from 'ui/PointSyncService';

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

  private mousePositionTransformer: MousePositionTransformer;
  private applicationUIContainer: HTMLElement;
  private newPolygonUIController: NewPolygonUIController;
  private pointSyncService: PointSyncService;
  private previousHitTestResult: HitTestResult | null = null;
  private previousHitTestTimestamp: number = 0;

  constructor(dependencies: UIControllerDependencies) {
    this.canvas = dependencies.canvas;
    this.application = dependencies.application;
    this.renderer = dependencies.renderer;
    this.stage = dependencies.stage;

    this.onClick = this.onClick.bind(this);
  }

  public init() {
    const applicationUIContainer = document.getElementById(configuration.applicationUIContainerID);
    if (!applicationUIContainer) {
      throw new Error('Application UI container not found');
    }

    this.applicationUIContainer = applicationUIContainer;

    this.mousePositionTransformer = new MousePositionTransformer(this.canvas);
    this.pointSyncService = new PointSyncService({
      application: this.application,
      container: this.applicationUIContainer,
      mousePositionTransformer: this.mousePositionTransformer,
      stage: this.stage
    });

    this.newPolygonUIController = new NewPolygonUIController({
      application: this.application,
      applicationUIContainer: this.applicationUIContainer,
      canvas: this.canvas,
      stage: this.stage,
      polygonLayer: this.stage.findLayerByName(LEX.POLYGON_LAYER_NAME),
      renderer: this.renderer,
      mousePositionTransformer: this.mousePositionTransformer
    });
    this.newPolygonUIController.init();

    this.canvas.addEventListener('click', this.onClick);
  }

  public destroy() {
    this.canvas.removeEventListener('click', this.onClick);
    this.newPolygonUIController.destroy();
  }

  public update() {
    this.pointSyncService.synchronizeComponents();
  }

  private onClick(event: MouseEvent) {
    const point = this.mousePositionTransformer.getPointFromMouseEvent(event);

    const hitTestResult = this.stage.hitTest(point);
    const previousHitTestResult = this.previousHitTestResult;
    const previousHitTestTimestamp = this.previousHitTestTimestamp;
    this.previousHitTestResult = hitTestResult;
    this.previousHitTestTimestamp = Date.now();

    if (!hitTestResult) {
      return this.newPolygonUIController.addNewPoint(point);
    }

    console.log('Hit test result', hitTestResult);

    if (
      !previousHitTestResult ||
      Date.now() - previousHitTestTimestamp > configuration.doubleClickMaxDelay
    ) {
      return;
    }

    if (previousHitTestResult.line.equals(hitTestResult.line)) {
      if (!hitTestResult.path) {
        return;
      }

      const index = hitTestResult.path.findPointIndex(hitTestResult.line.p2);
      const newPoint = hitTestResult.line.getMiddlePoint();

      hitTestResult.path.insertVertex(newPoint, index);
      this.application.render();
    }
  }
}
