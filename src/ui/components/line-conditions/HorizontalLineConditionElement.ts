import { HorizontalLineCondition } from 'conditions/HorizontalLineCondition';
import { LEX } from 'LEX';
import {
  LineConditionElementDependencies,
  SelectedTarget
} from 'ui/components/line-conditions/LineConditionElementDependencies';

export class HorizontalLineConditionElement extends HTMLElement {
  private readonly button: HTMLElement;

  private readonly selectedTarget: SelectedTarget;

  constructor(dependencies: LineConditionElementDependencies) {
    super();

    this.selectedTarget = dependencies.selectedTarget;

    const button = document.createElement('button');
    button.textContent = 'Horizontal';
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

    const condition = new HorizontalLineCondition(
      this.selectedTarget.line,
      this.selectedTarget.polygon
    );

    this.dispatchEvent(
      new CustomEvent(LEX.NEW_CONDITION_EVENT_NAME, { bubbles: true, detail: condition })
    );
  }
}

customElements.define('horizontal-line-condition', HorizontalLineConditionElement);
