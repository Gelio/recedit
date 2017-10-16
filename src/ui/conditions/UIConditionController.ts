import { ConditionPicker } from 'ui/components/ConditionPicker';
import { UIService } from 'ui/UIService';

import { Polygon } from 'common/Polygon';
import { EventAggregator } from 'events/EventAggregator';
import { LineClickEvent } from 'events/LineClickEvent';
import { LEX } from 'LEX';

interface UIConditionControllerDependencies {
  eventAggregator: EventAggregator;
  applicationUIContainer: HTMLElement;
}

export class UIConditionController implements UIService {
  private readonly eventAggregator: EventAggregator;
  private readonly applicationUIContainer: HTMLElement;

  private readonly conditionPicker: ConditionPicker = new ConditionPicker();

  constructor(dependencies: UIConditionControllerDependencies) {
    this.eventAggregator = dependencies.eventAggregator;
    this.applicationUIContainer = dependencies.applicationUIContainer;

    this.onLineClick = this.onLineClick.bind(this);
  }

  public init() {
    this.eventAggregator.addEventListener(LineClickEvent.eventType, this.onLineClick);
    this.applicationUIContainer.appendChild(this.conditionPicker);
    this.conditionPicker.addEventListener(LEX.NEW_CONDITION_EVENT_NAME, event => console.log('Custom event', event));
    this.conditionPicker.setAttribute('data-visible', 'false');
  }

  public destroy() {
    this.eventAggregator.removeEventListener(LineClickEvent.eventType, this.onLineClick);
    this.applicationUIContainer.removeChild(this.conditionPicker);
  }

  private onLineClick(event: LineClickEvent) {
    if (!(event.payload.path instanceof Polygon)) {
      return;
    }

    this.conditionPicker.setAttribute('data-x', event.payload.position.x.toString());
    this.conditionPicker.setAttribute('data-y', event.payload.position.y.toString());
    this.conditionPicker.updateSelectedLine(event.payload.line, event.payload.path);
    this.conditionPicker.setAttribute('data-visible', 'true');
  }
}
