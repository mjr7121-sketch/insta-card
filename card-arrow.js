import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


export class CardArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "card-arrow";
  }

  constructor() {
    super();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      .wrapper {
        position: absolute;
        top: 43%;
        left: var(--ddd-spacing-3);
        display: flex;
        justify-content: space-between;
        width: 24%;
        transform: translateY(-50%);
        z-index: 10;
      }
      button {
        background-color: dark grey;
        color: var(--ddd-theme-default-white);
        border: none;
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        font-size: var(--ddd-font-size-s);
      }
      button:hover {
        opacity: 0.8;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
        <button class="prev" @click=${() => this.dispatchEvent(new CustomEvent('prev-clicked', {bubbles: true, composed: true }))}>←
  </button>
        <button class="next" @click=${() => this.dispatchEvent(new CustomEvent('next-clicked', {bubbles: true, composed: true}))}>→
  </button>
    </div>
    `;
  }
}

globalThis.customElements.define(CardArrow.tag, CardArrow);