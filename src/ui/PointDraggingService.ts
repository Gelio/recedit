import { COLORS } from 'common/COLORS';
import { Layer } from 'common/Layer';
import { LineProperties } from 'common/LineProperties';
import { Point } from 'common/Point';
import { configuration } from 'configuration';
import { EventAggregator } from 'events/EventAggregator';
import { LEX } from 'LEX';
import { Stage } from 'Stage';

import { FinishPointDragEvent } from 'events/point-drag/FinishPointDragEvent';
import { PointDragEvent } from 'events/point-drag/PointDragEvent';
import { StartPointDragEvent } from 'events/point-drag/StartPointDragEvent';
import { RenderEvent } from 'events/RenderEvent';

interface PointDraggingServiceDependencies {
  eventAggregator: EventAggregator;
  stage: Stage;
}

export class PointDraggingService {
  private readonly eventAggregator: EventAggregator;
  private readonly stage: Stage;
  private pathGhostLayer: Layer;

  constructor(dependencies: PointDraggingServiceDependencies) {
    this.eventAggregator = dependencies.eventAggregator;
    this.stage = dependencies.stage;

    this.onStartPointDrag = this.onStartPointDrag.bind(this);
    this.onFinishPointDrag = this.onFinishPointDrag.bind(this);
    this.onPointDrag = this.onPointDrag.bind(this);
  }

  public init() {
    this.pathGhostLayer = new Layer(LEX.PATH_GHOST_LAYER_NAME);
    this.stage.layers.splice(0, 0, this.pathGhostLayer);

    this.eventAggregator.addEventListener(StartPointDragEvent.eventType, this.onStartPointDrag);
    this.eventAggregator.addEventListener(FinishPointDragEvent.eventType, this.onFinishPointDrag);
    this.eventAggregator.addEventListener(PointDragEvent.eventType, this.onPointDrag);
  }

  public destroy() {
    this.pathGhostLayer.paths = [];
    this.stage.removeLayer(this.pathGhostLayer);

    this.eventAggregator.removeEventListener(StartPointDragEvent.eventType, this.onStartPointDrag);
    this.eventAggregator.removeEventListener(
      FinishPointDragEvent.eventType,
      this.onFinishPointDrag
    );
    this.eventAggregator.removeEventListener(PointDragEvent.eventType, this.onPointDrag);
  }

  private onStartPointDrag(event: StartPointDragEvent) {
    event.handled = true;
    if (!configuration.displayPathGhostWhenDragging) {
      return;
    }

    const path = event.payload.path.clone();
    path.lineProperties = new LineProperties(COLORS.GREEN, 1);
    this.pathGhostLayer.paths.push(path);

    this.eventAggregator.dispatchEvent(new RenderEvent());
  }

  private onFinishPointDrag(event: FinishPointDragEvent) {
    event.handled = true;
    if (!configuration.displayPathGhostWhenDragging) {
      return;
    }

    this.pathGhostLayer.paths = [];

    this.eventAggregator.dispatchEvent(new RenderEvent());
  }

  private onPointDrag(event: PointDragEvent) {
    const { component, newPosition } = event.payload;

    component.path
      .getVertices()
      .filter(point => point !== component.point)
      .forEach(point => component.path.movePoint(point, this.getNewPointPosition(point)));

    component.path.movePoint(component.point, newPosition);
    component.point = newPosition;

    this.eventAggregator.dispatchEvent(new RenderEvent());
    event.handled = true;
  }

  private getNewPointPosition(point: Point) {
    const maxTranslation = 5;
    const translationVertex = new Point(
      this.getRandomInt(-maxTranslation, maxTranslation),
      this.getRandomInt(-maxTranslation, maxTranslation)
    );

    return Point.add(point, translationVertex);
  }

  private getRandomInt(min: number, max: number) {
    // tslint:disable-next-line
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
