import { VerticalLineCondition } from 'conditions/VerticalLineCondition';
import { LEX } from 'LEX';
import {
  LineConditionElementDependencies,
  SelectedTarget
} from 'ui/components/line-conditions/LineConditionElementDependencies';

export class VerticalLineConditionElement extends HTMLElement {
  private readonly button: HTMLElement;

  private readonly selectedTarget: SelectedTarget;

  constructor(dependencies: LineConditionElementDependencies) {
    super();

    this.selectedTarget = dependencies.selectedTarget;

    const button = document.createElement('button');
    button.textContent = 'Vertical';
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

    const condition = new VerticalLineCondition(
      this.selectedTarget.line,
      this.selectedTarget.polygon
    );

    this.dispatchEvent(
      new CustomEvent(LEX.NEW_CONDITION_EVENT_NAME, { bubbles: true, detail: condition })
    );
  }
}

customElements.define('vertical-line-condition', VerticalLineConditionElement);
