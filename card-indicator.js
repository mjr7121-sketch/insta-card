import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


export class CardIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "card-indicator";
  }

  constructor() {
    super();
    this.total = 0;
    this.currIndex = 0;
    };

  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      currIndex: {type: Number},
    };
  }

  static get styles() {
    return [super.styles,
    css`
    .dots{
      display: flex;
      gap: var(--ddd-spacing-2);
      justify-content: center;
      margin-top: var(--ddd-spacing-2);
      
    }
    .dot{
      width: var(--ddd-spacing-2);
      height: var(--ddd-spacing-2);
      border-radius: 50%;
      border: none;
      background-color: light-dark(var(--ddd-theme-default-potential50), var(--ddd-theme-default-potential50));
      cursor: pointer;
    }
    .dot.active{
       background-color: light-dark(var(--ddd-theme-default-coalyGray),var(--ddd-theme-default-white));
    }
     `];
  }

  render() {
    let dots = [];
    for(let i = 0; i<this.total; i++){
          dots.push(html`
      <span
        class="dot ${i === this.currIndex ? "active" : ""}"
        data-index="${i}"
        @click="${this._handleDotClick}">
      </span>
    `);
  }

  return html`
   <div class="dots">
      ${dots}
    </div>
  `;
}

  _handleDotClick(e){
    const index = Number(e.target.dataset.index);
    this.dispatchEvent (
      new CustomEvent("dot-clicked", {
        detail: {index} ,
        bubbles: true,
        composed: true
      })
    );
  }
}

globalThis.customElements.define(CardIndicator.tag, CardIndicator);