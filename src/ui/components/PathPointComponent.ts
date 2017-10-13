import { Path } from 'common/Path';
import { Point } from 'common/Point';

import { Application } from 'Application';
import { MousePositionTransformer } from 'ui/MousePositionTransformer';

import 'ui/components/PathPointComponent.scss';

const COMPONENT_CLASS_NAME = 'application-ui__vertex';
const ENABLED_CLASS_NAME = 'enabled';
const INITIAL_CLASS_NAME = 'application-ui__vertex--initial';

interface PathPointComponentDependencies {
  mousePositionTransformer: MousePositionTransformer;
  application: Application;
}

export class PathPointComponent {
  public element: HTMLDivElement;
  private container: HTMLElement;
  private path: Path;
  private point: Point;
  private readonly mousePositionTransformer: MousePositionTransformer;
  private readonly application: Application;

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
    this.element.remove();
  }

  public updatePosition() {
    this.element.style.top = `${this.point.y}px`;
    this.element.style.left = `${this.point.x}px`;
  }

  public get enabled() {
    return this.element.classList.contains(ENABLED_CLASS_NAME);
  }

  public set enabled(enable: boolean) {
    this.addOrRemoveElementClass(ENABLED_CLASS_NAME, enable);
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

    this.element.addEventListener('mousedown', this.onMouseDown);
  }

  private onMouseDown() {
    if (this.initial) {
      return;
    }

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.stopMoving);
  }

  private onMouseMove(event: MouseEvent) {
    const mousePosition = this.mousePositionTransformer.getPointFromMouseEvent(event);
    this.path.movePoint(this.point, mousePosition);
    this.updatePosition();
    this.application.render();
  }

  private stopMoving() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.stopMoving);
  }
}
