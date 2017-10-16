import { HorizontalLineCondition } from 'conditions/HorizontalLineCondition';
import { LEX } from 'LEX';
import {
  LineConditionElementDependencies,
  SelectedTarget
} from 'ui/components/line-conditions/LineConditionElementDependencies';

export class HorizontalLineConditionElement extends HTMLElement {
  private readonly button: HTMLButtonElement;

  private readonly selectedTarget: SelectedTarget;

  constructor(dependencies: LineConditionElementDependencies) {
    super();

    this.selectedTarget = dependencies.selectedTarget;

    this.button = document.createElement('button');
    this.button.textContent = 'Horizontal';
    this.button.addEventListener('click', this.onButtonClick.bind(this));
  }

  public connectedCallback() {
    this.appendChild(this.button);
    this.updateButton();
  }

  public disconnectedCallback() {
    this.removeChild(this.button);
  }

  private onButtonClick(event: MouseEvent) {
    event.stopPropagation();

    if (!this.selectedTarget.line || !this.selectedTarget.polygon) {
      return console.log('Target not selected');
    }

    const condition = new HorizontalLineCondition(
      this.selectedTarget.line,
      this.selectedTarget.polygon
    );

    this.dispatchEvent(
      new CustomEvent(LEX.NEW_CONDITION_EVENT_NAME, { bubbles: true, detail: condition })
    );
    this.updateButton();
  }

  private updateButton() {
    if (!this.selectedTarget.line || !this.selectedTarget.polygon) {
      return;
    }
    const polygon = this.selectedTarget.polygon;
    const line = this.selectedTarget.line;

    const lineConditions = polygon.getLineConditions();
    const matchingConditions = lineConditions
      .filter(lineCondition => lineCondition.line.equals(line));

    this.button.disabled = matchingConditions.length > 0;
  }
}

customElements.define('horizontal-line-condition', HorizontalLineConditionElement);
