import { Path } from 'common/Path';
import { Point } from 'common/Point';

import { MousePositionTransformer } from 'ui/MousePositionTransformer';

import { EventAggregator } from 'events/EventAggregator';
import { PointClickEvent } from 'events/PointClickEvent';
import { RenderEvent } from 'events/RenderEvent';

import 'ui/components/PathPointComponent.scss';

const COMPONENT_CLASS_NAME = 'application-ui__vertex';
const INITIAL_CLASS_NAME = 'application-ui__vertex--initial';

interface PathPointComponentDependencies {
  mousePositionTransformer: MousePositionTransformer;
  eventAggregator: EventAggregator;
}

export class PathPointComponent {
  public element: HTMLDivElement;
  public path: Path;
  public point: Point;
  private container: HTMLElement;
  private readonly mousePositionTransformer: MousePositionTransformer;
  private readonly eventAggregator: EventAggregator;

  constructor(container: HTMLElement, path: Path, point: Point, dependencies: PathPointComponentDependencies) {
    this.container = container;
    this.path = path;
    this.point = point;
    this.mousePositionTransformer = dependencies.mousePositionTransformer;
    this.eventAggregator = dependencies.eventAggregator;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
    this.init();
  }

  public remove() {
    this.element.removeEventListener('mousedown', this.onMouseDown);
    this.element.remove();
  }

  public updatePosition() {
    this.element.style.top = `${this.point.y}px`;
    this.element.style.left = `${this.point.x}px`;
  }

  public get initial() {
    return this.element.classList.contains(INITIAL_CLASS_NAME);
  }

  public set initial(isInitial: boolean) {
    if (isInitial) {
      this.element.classList.add(INITIAL_CLASS_NAME);
    } else {
      this.element.classList.remove(INITIAL_CLASS_NAME);
    }
  }

  private init() {
    this.element = document.createElement('div');
    this.container.appendChild(this.element);

    this.element.classList.add(COMPONENT_CLASS_NAME);
    this.updatePosition();

    if (this.path.getVerticesCount() === 1) {
      this.initial = true;
    }

    this.element.addEventListener('mousedown', this.onMouseDown);
  }

  private onMouseDown() {
    const event = new PointClickEvent(this);
    this.eventAggregator.dispatchEvent(event);

    if (event.handled) {
      return;
    }

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.stopDragging);
  }

  private onMouseMove(event: MouseEvent) {
    const mousePosition = this.mousePositionTransformer.getPointFromMouseEvent(event);
    this.path.movePoint(this.point, mousePosition);
    this.point = mousePosition;
    this.eventAggregator.dispatchEvent(new RenderEvent());
  }

  private stopDragging() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.stopDragging);
  }
}
