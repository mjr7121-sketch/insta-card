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
      margin-top: var(--ddd-spacing-2);
      margin-left: var(--ddd-spacing-30);
    }
    .dot{
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: none;
      background-color: var(--ddd-theme-default-limestoneGray);
      cursor: pointer;
    }
    .dot.active{
       background-color: var(--ddd-theme-default-skyBlue);
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