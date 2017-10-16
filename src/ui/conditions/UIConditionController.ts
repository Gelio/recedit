import { ConditionPicker } from 'ui/components/ConditionPicker';
import { UIService } from 'ui/UIService';

import { Line } from 'common/Line';
import { Polygon } from 'common/Polygon';
import { LineCondition } from 'conditions/LineCondition';
import { configuration } from 'configuration';
import { EventAggregator } from 'events/EventAggregator';
import { LineClickEvent } from 'events/LineClickEvent';
import { LEX } from 'LEX';

import { ConditionFixer } from 'conditions/ConditionFixer';

import { RenderEvent } from 'events/RenderEvent';
import { SyncComponentsEvent } from 'events/ui/SyncComponentsEvent';

interface UIConditionControllerDependencies {
  eventAggregator: EventAggregator;
  applicationUIContainer: HTMLElement;
}

export class UIConditionController implements UIService {
  private readonly eventAggregator: EventAggregator;
  private readonly applicationUIContainer: HTMLElement;

  private readonly conditionPicker: ConditionPicker = new ConditionPicker();
  private previousLineClickTimestamp = 0;

  constructor(dependencies: UIConditionControllerDependencies) {
    this.eventAggregator = dependencies.eventAggregator;
    this.applicationUIContainer = dependencies.applicationUIContainer;

    this.onLineClick = this.onLineClick.bind(this);
    this.onNewCondition = this.onNewCondition.bind(this);
  }

  public init() {
    this.eventAggregator.addEventListener(LineClickEvent.eventType, this.onLineClick);
    this.applicationUIContainer.appendChild(this.conditionPicker);
    this.conditionPicker.addEventListener(LEX.NEW_CONDITION_EVENT_NAME, this.onNewCondition);
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

    const previousClickTimestamp = this.previousLineClickTimestamp;
    const currentTimestamp = Date.now();
    this.previousLineClickTimestamp = currentTimestamp;

    if (currentTimestamp - previousClickTimestamp <= configuration.doubleClickMaxDelay) {
      return this.conditionPicker.setAttribute('data-visible', 'false');
    }

    this.conditionPicker.setAttribute('data-x', event.payload.position.x.toString());
    this.conditionPicker.setAttribute('data-y', event.payload.position.y.toString());
    this.conditionPicker.updateSelectedLine(event.payload.line, event.payload.path);
    this.conditionPicker.setAttribute('data-visible', 'true');
  }

  private onNewCondition(event: CustomEvent) {
    const lineCondition: LineCondition = event.detail;

    if (!lineCondition.isMet()) {
      const realPolygon = lineCondition.polygon;
      const p1Index = realPolygon.findPointIndex(lineCondition.line.p1);
      const p2Index = realPolygon.findPointIndex(lineCondition.line.p2);
      const polygonClone = realPolygon.clone();

      const conditionFixer = new ConditionFixer(polygonClone, polygonClone.getVertex(p1Index), [
        lineCondition.duplicateForNewLine(new Line(polygonClone.getVertex(p1Index), polygonClone.getVertex(p2Index)), polygonClone)
      ]);
      conditionFixer.tryFix();

      if (!conditionFixer.fixSuccessful) {
        return console.log('Fix not successful');
      }

      polygonClone.getVertices().forEach((point, index) => {
        realPolygon.getVertex(index).moveTo(point);
      });

      console.log('Forced condition to meet');
    }

    lineCondition.polygon.addLineCondition(lineCondition);
    this.eventAggregator.dispatchEvent(new RenderEvent());
    this.eventAggregator.dispatchEvent(new SyncComponentsEvent());
    this.conditionPicker.updateButtons();

    console.log('New condition', lineCondition);
    console.log('Is met:', lineCondition.isMet());
  }
}
