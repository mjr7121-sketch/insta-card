import { html, fixture, expect } from '@open-wc/testing';
import "../insta-card.js";

describe("InstaCard test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <insta-card
        title="title"
      ></insta-card>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
