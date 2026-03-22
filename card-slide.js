import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class CardSlide extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "card-slide";
  }
   static get properties() {
    return {
      ...super.properties,
      active: {type: Boolean, reflect: true},
      topHeading: {type: String, attribute: "top-heading"},
      secondHeading: {type: String, attribute: "second-heading"}
    };
  }

  constructor() {
    super();
    this.active = false;
    this.topHeading = "";
    this.secondHeading = "";
    };
  
    static get styles() {
    return [super.styles,
    css`
      :host {
        display: none;
        position: relative;
      }
      :host([active]) {
        display: block;
      }
      .slide {  
        padding: var(--ddd-spacing-2);
        margin-left: var(--ddd-spacing-25);
      }
      .top-heading {
        font-size: var(--ddd-font-size-xs);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-skyBlue);

      }
      .second-heading {
        font-size: var(--ddd-font-size-3xl);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-beaverBlue);
      }
      .line {
        border: 1px solid var(--ddd-theme-default-skyBlue);
        width: 75px;
        margin: var(--ddd-spacing-2) 0;
      }
      .text{
        max-height: 175px;
        overflow-y: auto;
        width: 600px;
        color: var(--ddd-theme-default-beaverBlue);
      }
      .text::-webkit-scrollbar {
        width: 12px;             
      }

      .text::-webkit-scrollbar-track {
      background: lightgray;  
      }

      .text::-webkit-scrollbar-thumb {
      background-color: var(--ddd-theme-default-beaverBlue);    
      border-radius: 20px;      
      border: 3px solid var(--ddd-theme-default-beaverBlue);  
}
      
    `];
  }

  render() {
     return html`
     <div class="slide">
        <p class="top-heading">${this.topHeading}</p>
        <h2 class="second-heading">${this.secondHeading}</h2>
        <hr class="line">
        <div class="text">
          <slot></slot>
        </div>
      </div>`;
  }
}

globalThis.customElements.define(CardSlide.tag, CardSlide);