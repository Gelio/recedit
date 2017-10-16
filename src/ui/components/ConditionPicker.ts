import { FixedLengthConditionElement } from 'ui/components/line-conditions/FixedLengthConditionElement';
import { HorizontalLineConditionElement } from 'ui/components/line-conditions/HorizontalLineConditionElement';
import { VerticalLineConditionElement } from 'ui/components/line-conditions/VerticalLineConditionElement';

import { LineConditionElementDependencies, SelectedTarget } from 'ui/components/line-conditions/LineConditionElementDependencies';

import { Line } from 'common/Line';
import { Polygon } from 'common/Polygon';

import 'ui/components/ConditionPicker.scss';

export class ConditionPicker extends HTMLElement {
  private readonly selectedTarget: SelectedTarget = {
    line: null,
    polygon: null
  };

  private readonly conditionElementsContainer: HTMLDivElement;
  private readonly closeButton: HTMLButtonElement;

  constructor() {
    super();
    this.onMouseDown = this.onMouseDown.bind(this);
    this.hide = this.hide.bind(this);

    const lineConditionElements = this.createLineConditionElements();

    this.closeButton = document.createElement('button');
    this.closeButton.className = 'condition-picker__close-button';
    this.closeButton.textContent = 'X';

    this.conditionElementsContainer = document.createElement('div');
    this.conditionElementsContainer.className = 'condition-elements-container';
    lineConditionElements.forEach(element => this.conditionElementsContainer.appendChild(element));

    this.updatePosition();
  }

  public static get observedAttributes() {
    return ['data-x', 'data-y', 'data-visible'];
  }

  public connectedCallback() {
    this.appendChild(this.closeButton);
    this.appendChild(this.conditionElementsContainer);

    this.closeButton.addEventListener('click', this.hide);
    window.addEventListener('mousedown', this.onMouseDown);
  }

  public disconnectedCallback() {
    this.removeChild(this.closeButton);
    this.removeChild(this.conditionElementsContainer);

    this.closeButton.removeEventListener('click', this.hide);
    window.removeEventListener('mousedown', this.onMouseDown);
  }

  public attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
    if (attributeName === 'data-x' || attributeName === 'data-y') {
      this.updatePosition();
    } else if (attributeName === 'data-visible') {
      if (newValue === 'true') {
        this.style.display = 'flex';
      } else {
        this.style.display = 'none';
      }
    }
  }

  public updateSelectedLine(line: Line, polygon: Polygon) {
    this.selectedTarget.line = line;
    this.selectedTarget.polygon = polygon;
  }

  private updatePosition() {
    this.style.left = `${this.getAttribute('data-x') || 0}px`;
    this.style.top = `${this.getAttribute('data-y') || 0}px`;
  }

  private onMouseDown(event: MouseEvent) {
    if (event && event.srcElement && this.contains(event.srcElement)) {
      return;
    }

    this.hide();
  }

  private hide() {
    this.setAttribute('data-visible', 'false');
  }

  private createLineConditionElements() {
    const lineConditionElementDependencies: LineConditionElementDependencies = {
      selectedTarget: this.selectedTarget
    };

    return [
      new FixedLengthConditionElement(lineConditionElementDependencies),
      new VerticalLineConditionElement(lineConditionElementDependencies),
      new HorizontalLineConditionElement(lineConditionElementDependencies)
    ];
  }
}

customElements.define('app-condition-picker', ConditionPicker);
