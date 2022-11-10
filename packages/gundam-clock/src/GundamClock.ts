import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class GundamClock extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 5px;
      color: var(--gundam-clock-text-color, #000);
    }
  `;

  @property({ type: Number })
  value = 0;

  private _timer = 0;

  constructor() {
    super();
    this.value = Date.now();
  }

  connectedCallback() {
    super.connectedCallback();

    this._timer = window.setInterval(() => {
      this.value = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
    window.clearInterval(this._timer);
    super.disconnectedCallback();
  }

  format() {
    return new Date(this.value).toString();
  }

  render() {
    return html` <div>${this.format()}</div> `;
  }
}
