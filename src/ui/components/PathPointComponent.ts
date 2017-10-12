import { Path } from 'common/Path';
import { Point } from 'common/Point';

import 'ui/components/PathPointComponent.scss';

const ENABLED_CLASS_NAME = 'enabled';
const INITIAL_CLASS_NAME = 'application-ui__vertex--initial';

export class PathPointComponent {
  public element: HTMLDivElement;
  private container: HTMLElement;
  private path: Path;
  private point: Point;

  constructor(container: HTMLElement, path: Path, point: Point) {
    this.container = container;
    this.path = path;
    this.point = point;
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
    const enabled = this.enabled;

    if (enable && enabled) {
      return;
    } else if (!enable && !enabled) {
      return;
    }

    this.element.classList.toggle(ENABLED_CLASS_NAME);
  }

  public get initial() {
    return this.element.classList.contains(INITIAL_CLASS_NAME);
  }

  public set initial(initial: boolean) {
    const isCurrentlyInitial = this.initial;

    if (initial && isCurrentlyInitial) {
      return;
    } else if (!initial && !isCurrentlyInitial) {
      return;
    }

    this.element.classList.toggle(INITIAL_CLASS_NAME);
  }

  private init() {
    this.element = document.createElement('div');
    this.container.appendChild(this.element);

    this.element.classList.add('application-ui__vertex');
    this.updatePosition();

    this.element.addEventListener('click', () => {
      console.log('Clicked', this.element);
    });
  }
}
