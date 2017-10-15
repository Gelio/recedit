import { Point } from 'common/Point';
import { EventAggregator } from 'events/EventAggregator';
import { PointDragEvent } from 'events/point-drag/PointDragEvent';
import { RenderEvent } from 'events/RenderEvent';

interface PointDraggingServiceDependencies {
  eventAggregator: EventAggregator;
}

export class PointDraggingService {
  private readonly eventAggregator: EventAggregator;

  constructor(dependencies: PointDraggingServiceDependencies) {
    this.eventAggregator = dependencies.eventAggregator;

    this.onPointDrag = this.onPointDrag.bind(this);
  }

  public init() {
    this.eventAggregator.addEventListener(PointDragEvent.eventType, this.onPointDrag);
  }

  public destroy() {
    this.eventAggregator.removeEventListener(PointDragEvent.eventType, this.onPointDrag);
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
    console.log(translationVertex);

    return Point.add(point, translationVertex);
  }

  private getRandomInt(min: number, max: number) {
    // tslint:disable-next-line
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
