/**
 * Copyright 2026 mjr7121-sketch
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

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

  const params = new URLSearchParams(window.location.search);
  const indexFromURL = params.get("activeIndex");

  if (indexFromURL !== null) {
  this.index = parseInt(indexFromURL);
  }

    this.addEventListener("prev-clicked", this.prev);
    this.addEventListener("next-clicked", this.next);

    this.addEventListener("dot-clicked", (e) => {
    this.index = e.detail.index;

    const url = new URL(window.location);
    url.searchParams.set("activeIndex", this.index);
    window.history.pushState({}, "", url);
});
  }

  /**
 * data structure:
 * an array of objects containing the username, datePosted, and pic
 */

  async getFox(){
    const fetchTheFox = await fetch("/api/dataStructure");
   
    const data = await fetchTheFox.json();
    
    let newItems = [];

    for(let i = 0; i < data.length; i++){
      let item = data[i];
      item.liked = false;
      newItems.push(item);
    }

    this.items = newItems;

    const saved = JSON.parse(localStorage.getItem("likes"));

    if (saved && saved.length === newItems.length) {
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

    const url = new URL(window.location);
    url.searchParams.set("activeIndex", this.index);
    window.history.pushState({}, "", url);
    }
  }

  next() {
    if (this.index < this.items.length - 1) {
    this.index++;

    const url = new URL(window.location);
    url.searchParams.set("activeIndex", this.index);
    window.history.pushState({}, "", url);
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
        max-width: var(--ddd-layout-maxwidth-xs, 320px);
        width: 100%;

      }
      :root{
        color-scheme: light-dark;
      }
      .wrapper {
        padding: var(--ddd-spacing-0);
        position: relative;
        color: light-dark(var(--ddd-theme-default-black), var(--ddd-theme-default-white));
      }
      
      h1 span {
        font-size: var(--insta-card-label-font-size, var(--ddd-font-size-s));
      }

      img{
        width: 100%;
        height: var(--ddd-size-200, 200px);
        display: block;
        max-width: 100%;

      }

      p{
        margin: var(--ddd-spacing-0);
      }

      .card{
        position: relative;
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-5);
      }

      .place{
        color: light-dark(var(--ddd-theme-default-coalyGray), var(--ddd-theme-default-white));
      }

      .username1{
        font-weight: var(--ddd-font-weight-bold);
      }

      .userName2{
        font-weight: var(--ddd-font-weight-bold);
      }

      .actions{
        margin: var(--ddd-spacing-2); 
      }
      .posted{
        color: light-dark(var(--ddd-theme-default-navy65), var(--ddd-theme-default-slateLight));
      }
      .user{
        display: flex;
        gap: var(--ddd-spacing-2);
        align-items: center;
      }
      .profile{
        width: var(--ddd-icon-sm, 32px);
        height: var(--ddd-icon-sm, 32px);
        border-radius: var(--ddd-radius-circle, 50%);
        object-fit: cover;

      }
      .middle{
        position: relative; 
        align-items: center;
        justify-content: space-between;
      }
      .counter{
        position: absolute; 
        bottom: var(--ddd-spacing-1);
        right: var(--ddd-spacing-9);
        color: light-dark(var(--ddd-theme-default-black), var(--ddd-theme-default-white));
      }
  
    `];
  }

  // Lit render the HTML
  render() {

  if (!this.items.length) {
  return html`<p>Loading...</p>`;
  }

    return html`
<div class="wrapper">
  
  ${this.items.map((item, i) =>  html`

        <div class="card" ?hidden=${i !== this.index}>

          <div class="top">
          
          <div class="user">
          <img class="profile" src="${item.profilePic}" alt="Profile picture of ${item.userName}" />
          <!-- displays the profile photo and the user name -->
          <p class= "username1"> ${item.userName}</p>
          </div>

          <!-- displays the location the photo was taken at -->
          <p class= "place">📍${item.location}</p>
        </div>

          <!-- displays the images -->
          <div class="middle">
          
          <card-arrow></card-arrow>

          <!-- loads one image at a time -->
          ${i === this.index
          ? html`<img src="${item.pic}" alt="Photo by ${item.userName}" loading="lazy">`
          : html``}

          <card-indicator 
            .total=${this.items.length}
            .currIndex=${this.index}>
          </card-indicator>

          <!-- displays the three icons -->
          <div class="actions">
          <span class="icon" @click=${() => this.toggleLike(i)}>
          ${item.liked ? "❤️" : "🤍"}
          </span>
          <span class="icon">💬</span>
          <span class="icon" @click=${() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied!"); 
          }}>🔗</span>

          <div class="bottom">
          <!-- displays the username and caption  -->
          <p class="captionInfo">
          <span class="userName2">${item.userName}</span>
          <span class="caption">${item.caption}</span>
        </p>

          <!-- displays when the image was posted -->
          <p class="posted">${item.datePosted}</p>

          <p class="counter">
          ${this.index + 1} / ${this.items.length}
          </p>
          </div>
        </div>
        </div>
      `)}

</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(InstaCard.tag, InstaCard);