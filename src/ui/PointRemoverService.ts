import { configuration } from 'configuration';

import { EventAggregator } from 'events/EventAggregator';
import { PointClickEvent } from 'events/PointClickEvent';
import { RenderEvent } from 'events/RenderEvent';
import { PathPointComponent } from 'ui/components/PathPointComponent';

interface PointRemoverServiceDependencies {
  eventAggregator: EventAggregator;
}

export class PointRemoverService {
  private readonly eventAggregator: EventAggregator;

  private previousPathPointComponent: PathPointComponent;
  private previousClickTimestamp = 0;

  constructor(dependencies: PointRemoverServiceDependencies) {
    this.eventAggregator = dependencies.eventAggregator;
    this.onPointClick = this.onPointClick.bind(this);
  }

  public init() {
    this.eventAggregator.addEventListener(PointClickEvent.eventType, this.onPointClick);
  }

  public destroy() {
    this.eventAggregator.removeEventListener(PointClickEvent.eventType, this.onPointClick);
  }

  private onPointClick(event: PointClickEvent) {
    const currentTimestamp = Date.now();

    const pathPointComponent = event.payload;
    const previousPathPointComponent = this.previousPathPointComponent;
    const previousClickTimestamp = this.previousClickTimestamp;

    this.updatePreviousClickInformation(event, currentTimestamp);

    if (!previousPathPointComponent || previousPathPointComponent !== pathPointComponent) {
      return;
    }

    if (currentTimestamp - previousClickTimestamp > configuration.doubleClickMaxDelay) {
      return;
    }

    this.removePreviousClickedPoint();
    event.handled = true;
  }

  private updatePreviousClickInformation(event: PointClickEvent, timestamp: number) {
    this.previousPathPointComponent = event.payload;
    this.previousClickTimestamp = timestamp;
  }

  private removePreviousClickedPoint() {
    const path = this.previousPathPointComponent.path;
    const point = this.previousPathPointComponent.point;

    try {
      path.removeVertex(point);
    } catch (error) {
      alert('Cannot remove vertex');
      console.error(error);

      return;
    }

    this.previousPathPointComponent.remove();
    this.eventAggregator.dispatchEvent(new RenderEvent());
  }
}
