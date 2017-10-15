import { Path } from 'common/Path';
import { Point } from 'common/Point';

import { Application } from 'Application';
import { configuration } from 'configuration';
import { MousePositionTransformer } from 'ui/MousePositionTransformer';

import 'ui/components/PathPointComponent.scss';

const COMPONENT_CLASS_NAME = 'application-ui__vertex';
const INITIAL_CLASS_NAME = 'application-ui__vertex--initial';

interface PathPointComponentDependencies {
  mousePositionTransformer: MousePositionTransformer;
  application: Application;
}

export class PathPointComponent {
  public element: HTMLDivElement;
  public path: Path;
  public point: Point;
  private container: HTMLElement;
  private readonly mousePositionTransformer: MousePositionTransformer;
  private readonly application: Application;

  private previousClickTimestamp: number = 0;

  constructor(container: HTMLElement, path: Path, point: Point, dependencies: PathPointComponentDependencies) {
    this.container = container;
    this.path = path;
    this.point = point;
    this.mousePositionTransformer = dependencies.mousePositionTransformer;
    this.application = dependencies.application;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.stopMoving = this.stopMoving.bind(this);
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
    this.addOrRemoveElementClass(INITIAL_CLASS_NAME, isInitial);
  }

  private addOrRemoveElementClass(className: string, value: boolean) {
    if (value) {
      this.element.classList.add(className);
    } else {
      this.element.classList.remove(className);
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
    if (this.initial) {
      return;
    }

    const currentTimestamp = Date.now();

    if (currentTimestamp - this.previousClickTimestamp <= configuration.doubleClickMaxDelay) {
      try {
        this.path.removeVertex(this.point);
      } catch (error) {
        alert('Cannot remove vertex');

        return;
      }
      this.remove();
      this.application.render();

      return;
    }
    this.previousClickTimestamp = currentTimestamp;

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.stopMoving);
  }

  private onMouseMove(event: MouseEvent) {
    const mousePosition = this.mousePositionTransformer.getPointFromMouseEvent(event);
    this.path.movePoint(this.point, mousePosition);
    this.point = mousePosition;
    this.updatePosition();
    this.application.render();
  }

  private stopMoving() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.stopMoving);
  }
}
