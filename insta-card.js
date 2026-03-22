/**
 * Copyright 2026 mjr7121-sketch
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

import "./card-slide.js";
import "./card-arrow.js";
import "./card-indicator.js";

/**
 * `insta-card`
 * 
 * @demo index.html
 * @element insta-card
 */
export class InstaCard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-card";
  }

  constructor() {
    super();
    this.title = "";
    this.index = 0;
    this.foxImage = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/insta-card.ar.json", import.meta.url).href +
        "/../",
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      index: {type: Number, reflect: true},
      foxImage: {type: String},
    };
  }

  connectedCallback(){
    super.connectedCallback();
    this.getFox();
  }

  async getFox(){
    const fetchTheFox = await fetch("https://randomfox.ca/floof/");
    const data = await fetchTheFox.json();
    this.foxImage = data.image; 
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--insta-card-label-font-size, var(--ddd-font-size-s));
      }
      img{
        width: 200px;
        height: 140px; 
      }
  
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>
  <img src="${this.foxImage}">
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(InstaCard.tag, InstaCard);