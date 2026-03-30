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
    this.items = [];
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
      items: {type: Array},
    };
  }

  connectedCallback(){
    super.connectedCallback();
    this.getFox();

    this.addEventListener("prev-clicked", this.prev);
    this.addEventListener("next-clicked", this.next);
  }

  /**
 * data structure:
 * an array of objects containing the username, datePosted, and pic
 */

  async getFox(){
    const fetchTheFox = await fetch("./dataStructure.json");
    const data = await fetchTheFox.json();
    
    let newItems = [];

    for(let i = 0; i < data.length; i++){
      let item = data[i];
      item.liked = false;
      newItems.push(item);
    }

    this.items = newItems;

    const saved = JSON.parse(localStorage.getItem("likes"));
    if(saved){
      this.items = saved;
    }
  }

  toggleLike(index) {
    this.items[index].liked = !this.items[index].liked;

    localStorage.setItem("likes", JSON.stringify(this.items));

    this.requestUpdate();
  }

  prev() {
  if (this.index > 0) {
    this.index--;
  }
  }

  next() {
    if (this.index < this.items.length - 1) {
    this.index++;
    }
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
        margin: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-10);
        position: relative;
      }
      h1 span {
        font-size: var(--insta-card-label-font-size, var(--ddd-font-size-s));
      }
      img{
        width: 200px;
        height: 140px; 
        margin: -6px 0px;
      }
      p{
        margin: var(--ddd-spacing-1);
      }
      .card{
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-5);
      }
      .place{
        color: var(--ddd-theme-default-coalyGray);
      }
      .username1{
        margin: -5px 0px;
        font-weight: var(--ddd-font-weight-bold);
      }
      .userName2{
        font-weight: var(--ddd-font-weight-bold);
      }
      .actions{
        margin: var(--ddd-spacing-2); 
      }
      .posted{
        color: var(--ddd-theme-default-coalyGray);
      }
  
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">

<card-arrow></card-arrow>
  
  ${this.items.length > 0 ? html`
        <div class = "card">
          <!-- displays the profile photo and the user name -->
          <p class= "username1">🙍🏼‍♀️ ${this.items[this.index].userName}</p>

          <!-- displays the location the photo was taken at -->
          <p class= "place">📍${this.items[this.index].location}</p>

          <!-- displays the images -->
          <img src="${this.items[this.index].pic}">

          <!-- displays the three icons -->
          <div class="actions">
          <span class="icon" @click=${() => this.toggleLike(this.index)}>
          ${this.items[this.index].liked ? "❤️" : "🤍"}
          </span>
          <span class="icon">💬</span>
          <span class="icon">🔗</span>

          <!-- displays the username and caption  -->
          <p class="userName2">${this.items[this.index].userName} 🦊 </p>

          <!-- displays when the image was posted -->
          <p class="posted">${this.items[this.index].datePosted}</p>
        </div>
        </div>
      ` : ""}

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