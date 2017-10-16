import { VerticalLineCondition } from 'conditions/VerticalLineCondition';
import { LEX } from 'LEX';
import {
  LineConditionElementDependencies,
  SelectedTarget
} from 'ui/components/line-conditions/LineConditionElementDependencies';

export class VerticalLineConditionElement extends HTMLElement {
  private readonly button: HTMLButtonElement;

  private readonly selectedTarget: SelectedTarget;

  constructor(dependencies: LineConditionElementDependencies) {
    super();

    this.selectedTarget = dependencies.selectedTarget;

    this.button = document.createElement('button');
    this.button.textContent = 'Vertical';
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

    const condition = new VerticalLineCondition(
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

customElements.define('vertical-line-condition', VerticalLineConditionElement);
