import { Application } from 'Application';
import { COLORS } from 'common/COLORS';
import { Layer } from 'common/Layer';
import { LineProperties } from 'common/LineProperties';
import { Path } from 'common/Path';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';
import { Renderer } from 'Renderer';
import { Stage } from 'Stage';

const CLOSING_DISTANCE = 15;

interface UIControllerDependencies {
  application: Application;
  renderer: Renderer;
  stage: Stage;
}

enum UIStates {
  InitialPolygon,
  AfterInitialPolygon
}

export class UIController {
  private readonly canvas: HTMLCanvasElement;
  private readonly application: Application;
  private readonly renderer: Renderer;
  private readonly stage: Stage;

  private readonly polygonLayer = new Layer('PolygonLayer');
  private readonly pathLayer = new Layer('PathLayer');

  private currentState = UIStates.InitialPolygon;
  private unfinishedPath: Path;
  private newLineProperties = new LineProperties(COLORS.BLUE, 2);
  private newPolygonProperties = new LineProperties(COLORS.RED, 1);

  constructor(canvas: HTMLCanvasElement, dependencies: UIControllerDependencies) {
    this.canvas = canvas;
    this.application = dependencies.application;
    this.renderer = dependencies.renderer;
    this.stage = dependencies.stage;

    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  public init() {
    this.stage.layers.push(this.polygonLayer, this.pathLayer);
    this.startNewUnfinishedPath();

    this.canvas.addEventListener('click', this.onClick);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
  }

  public destroy() {
    this.canvas.removeEventListener('click', this.onClick);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);

    this.stage.removeLayer(this.pathLayer);
    this.stage.removeLayer(this.polygonLayer);
  }

  private startNewUnfinishedPath() {
    this.unfinishedPath = new Path([], this.newPolygonProperties);
    this.pathLayer.paths.push(this.unfinishedPath);
  }

  private onClick(event: MouseEvent) {
    const point = this.getPointFromMouseEvent(event);

    switch (this.currentState) {
      case UIStates.InitialPolygon:
        this.addNewPoint(point);
        break;

      case UIStates.AfterInitialPolygon:
        break;

      default:
        console.error('Unknown state', this.currentState);
        break;
    }
  }

  private addNewPoint(point: Point) {
    let pointHandled = false;

    const hitTestResult = this.stage.hitTest(point);
    console.log('Hit test result', hitTestResult);

    if (this.unfinishedPath.getVerticesCount() >= 3) {
      const distanceToFirstPoint = Point.getDistanceBetween(point, this.unfinishedPath.getStartingPoint());

      if (distanceToFirstPoint < CLOSING_DISTANCE) {
        this.polygonLayer.paths.push(new Polygon(this.unfinishedPath.vertices, LineProperties.getDefault()));

        this.pathLayer.removePath(this.unfinishedPath);
        this.startNewUnfinishedPath();
        pointHandled = true;
      }
    }

    if (!pointHandled) {
      this.unfinishedPath.vertices.push(point);
    }
    this.application.render();
  }

  private onMouseMove(event: MouseEvent) {
    const unfinishedPathVerticesCount = this.unfinishedPath.getVerticesCount();
    if (unfinishedPathVerticesCount === 0) {
      return;
    }

    const lastPoint = this.unfinishedPath.vertices[unfinishedPathVerticesCount - 1];
    this.application.render();

    const point = this.getPointFromMouseEvent(event);
    this.renderer.drawLine(lastPoint, point, this.newLineProperties);
  }

  private getPointFromMouseEvent(event: MouseEvent) {
    return new Point(
      event.pageX - this.canvas.offsetLeft,
      event.pageY - this.canvas.offsetTop
    );
  }
}
