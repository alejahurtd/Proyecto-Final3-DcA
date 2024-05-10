import indexStyle from "./lower-menu.css";

export enum Attribute {
  "user" = "user",
}

class lowerMenu extends HTMLElement {
  user?: string;

  static get observedAttributes() {
    const attrs: Record<Attribute, null> = {
      user: null,
    };
    return Object.keys(attrs);
  }

  attributeChangedCallback(
    propName: Attribute,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    switch (propName) {
      default:
        this[propName] = newValue;
        break;
    }
    this.render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <style>
        ${indexStyle}
      </style>

        <hr class="linea-blanca">
        <section>
            <p>© 2023 img, Inc. <a href="url" class="user-link">Mobile version</a></p>

            <div class="left">
                <p>Terms of Services</p>
                <p>Privacy</p>
                <p>Help</p>
            </div>
        </section>

      `;
    }
  }
}

customElements.define("lower-menu", lowerMenu);
export default lowerMenu;
