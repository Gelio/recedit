import { FixedLengthLineCondition } from 'conditions/FixedLengthLineCondition';
import { LEX } from 'LEX';
import {
  LineConditionElementDependencies,
  SelectedTarget
} from 'ui/components/line-conditions/LineConditionElementDependencies';

export class FixedLengthConditionElement extends HTMLElement {
  private readonly button: HTMLButtonElement;
  private readonly selectedTarget: SelectedTarget;

  constructor(dependencies: LineConditionElementDependencies) {
    super();

    this.selectedTarget = dependencies.selectedTarget;

    this.button = document.createElement('button');
    this.button.textContent = 'Fixed length';
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

    let length = Number.NaN;
    const originalLineLength = this.selectedTarget.line.getLength().toFixed(1);

    while (Number.isNaN(length) || length === 0) {
      const value = prompt('Provide the fixed length', originalLineLength);

      if (!value) {
        return;
      }

      length = parseInt(value, 10);
    }

    const condition = new FixedLengthLineCondition(
      this.selectedTarget.line,
      this.selectedTarget.polygon,
      length
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

customElements.define('fixed-length-condition', FixedLengthConditionElement);
