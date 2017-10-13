import { Application } from 'Application';
import { Layer } from 'common/Layer';
import { Path } from 'common/Path';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';
import { configuration } from 'configuration';
import { LEX } from 'LEX';
import { Renderer } from 'Renderer';
import { Stage } from 'Stage';
import { PathPointComponent } from 'ui/components/PathPointComponent';
import { MousePositionTransformer } from 'ui/MousePositionTransformer';

interface NewPolygonUIControllerDependencies {
  application: Application;
  applicationUIContainer: HTMLElement;
  canvas: HTMLCanvasElement;
  mousePositionTransformer: MousePositionTransformer;
  polygonLayer: Layer;
  renderer: Renderer;
  stage: Stage;
}

export class NewPolygonUIController {
  private readonly application: Application;
  private readonly applicationUIContainer: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly stage: Stage;
  private readonly mousePositionTransformer: MousePositionTransformer;
  private readonly renderer: Renderer;

  private unfinishedPath: Path;
  private startingPathPointComponent: PathPointComponent;
  private readonly pathLayer = new Layer(LEX.PATH_LAYER_NAME);
  private readonly polygonLayer: Layer;

  constructor(dependencies: NewPolygonUIControllerDependencies) {
    this.application = dependencies.application;
    this.applicationUIContainer = dependencies.applicationUIContainer;
    this.canvas = dependencies.canvas;
    this.stage = dependencies.stage;
    this.polygonLayer = dependencies.polygonLayer;
    this.mousePositionTransformer = dependencies.mousePositionTransformer;
    this.renderer = dependencies.renderer;

    this.closePath = this.closePath.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  public init() {
    this.stage.layers.push(this.pathLayer);
    this.startNewUnfinishedPath();

    this.canvas.addEventListener('mousemove', this.onMouseMove);
  }

  public destroy() {
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.stage.removeLayer(this.pathLayer);
  }

  public addNewPoint(point: Point) {
    this.unfinishedPath.addVertex(point);
    const pathPointComponent = new PathPointComponent(
      this.applicationUIContainer,
      this.unfinishedPath,
      point
    );
    pathPointComponent.enabled = true;

    if (this.unfinishedPath.getVerticesCount() === 1) {
      this.startingPathPointComponent = pathPointComponent;
      pathPointComponent.element.addEventListener('click', this.closePath);
      pathPointComponent.initial = true;
    }

    this.application.render();
  }

  public onMouseMove(event: MouseEvent) {
    const unfinishedPathVerticesCount = this.unfinishedPath.getVerticesCount();
    if (unfinishedPathVerticesCount === 0) {
      return;
    }

    const lastPoint = this.unfinishedPath.getVertex(unfinishedPathVerticesCount - 1);
    this.application.render();

    const point = this.mousePositionTransformer.getPointFromMouseEvent(event);
    this.renderer.drawLine(lastPoint, point, configuration.newLinePreviewProperties);
  }

  private startNewUnfinishedPath() {
    this.unfinishedPath = new Path([], configuration.newPolygonLineProperties);
    this.pathLayer.paths.push(this.unfinishedPath);
  }

  private closePath() {
    if (this.unfinishedPath.getVerticesCount() < configuration.minPolygonPoints) {
      return alert(`Polygon must have at least ${configuration.minPolygonPoints} vertices`);
    }

    this.unfinishedPath.lineProperties = configuration.polygonLineProperties;
    this.polygonLayer.paths.push(new Polygon(this.unfinishedPath));

    this.pathLayer.removePath(this.unfinishedPath);
    this.startingPathPointComponent.element.removeEventListener('click', this.closePath);
    this.startingPathPointComponent.initial = false;

    this.startNewUnfinishedPath();
    this.application.render();
  }
}
