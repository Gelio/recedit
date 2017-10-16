import { FixedLengthLineCondition } from 'conditions/FixedLengthLineCondition';
import { LEX } from 'LEX';
import {
  LineConditionElementDependencies,
  SelectedTarget
} from 'ui/components/line-conditions/LineConditionElementDependencies';

export class FixedLengthConditionElement extends HTMLElement {
  private readonly button: HTMLElement;
  private readonly selectedTarget: SelectedTarget;

  constructor(dependencies: LineConditionElementDependencies) {
    super();

    this.selectedTarget = dependencies.selectedTarget;

    const button = document.createElement('button');
    button.textContent = 'Fixed length';
    button.addEventListener('click', this.onButtonClick.bind(this));

    this.button = button;
  }

  public connectedCallback() {
    this.appendChild(this.button);
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
  }
}

customElements.define('fixed-length-condition', FixedLengthConditionElement);
