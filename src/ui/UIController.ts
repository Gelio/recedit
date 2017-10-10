import { Application } from 'Application';
import { COLORS } from 'common/COLORS';
import { LineProperties } from 'common/LineProperties';
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

  private currentState = UIStates.InitialPolygon;
  private pointsList: Point[] = [];

  constructor(canvas: HTMLCanvasElement, dependencies: UIControllerDependencies) {
    this.canvas = canvas;
    this.application = dependencies.application;
    this.renderer = dependencies.renderer;
    this.stage = dependencies.stage;

    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  public init() {
    this.canvas.addEventListener('click', this.onClick);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
  }

  public destroy() {
    this.canvas.removeEventListener('click', this.onClick);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  }

  private onClick(event: MouseEvent) {
    const point = this.getPointFromMouseEvent(event);

    switch (this.currentState) {
      case UIStates.InitialPolygon:
        console.log('Adding a new point', point);
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
    if (this.pointsList.length >= 3) {
      const distanceToFirstPoint = Point.getDistanceBetween(point, this.pointsList[0]);

      if (distanceToFirstPoint < CLOSING_DISTANCE) {
        this.stage.polygons.push(new Polygon(this.pointsList, LineProperties.getDefault()));

        this.pointsList = [];
        this.application.render();

        return;
      }
    }

    this.pointsList.push(point);
    this.application.render();
    this.renderPointsList();
  }

  private renderPointsList() {
    const lineProperties = new LineProperties(COLORS.GREEN, 2);

    this.pointsList.reduce((p1, p2) => {
      this.renderer.drawLine(p1, p2, lineProperties);

      return p2;
    });
  }

  private onMouseMove(event: MouseEvent) {
    if (this.pointsList.length === 0) {
      return;
    }

    const lastPoint = this.pointsList[this.pointsList.length - 1];
    this.application.render();
    this.renderPointsList();

    const point = this.getPointFromMouseEvent(event);
    this.renderer.drawLine(lastPoint, point, new LineProperties(COLORS.RED, 1));
  }

  private getPointFromMouseEvent(event: MouseEvent) {
    return new Point(
      event.pageX - this.canvas.offsetLeft,
      event.pageY - this.canvas.offsetTop
    );
  }
}
