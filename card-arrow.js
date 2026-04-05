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
      :root{
        color-scheme: light-dark;
      }
      .wrapper {
        top: 50%;
        display: flex;
        justify-content: space-between;
        width: 100%;
        position: absolute;
        left: 0;
        transform: translateY(-50%);

      }
      button {
        background-color: light-dark(var(--ddd-theme-default-coalyGray), var(--ddd-theme-default-white));
        color: light-dark(var(--ddd-theme-default-white), var(--ddd-theme-default-coalyGray));;
        padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
        border-radius: var(--ddd-radius-sm);
        border: var(--ddd-spacing-0);
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
        <button class="prev" title="Previous image" aria-label="Previous image" @click=${() => this.dispatchEvent(new CustomEvent('prev-clicked', {bubbles: true, composed: true }))}>←
  </button>
        <button class="next" title="Next image" aria-label="Next image" @click=${() => this.dispatchEvent(new CustomEvent('next-clicked', {bubbles: true, composed: true}))}>→
  </button>
    </div>
    `;
  }
}

globalThis.customElements.define(CardArrow.tag, CardArrow);