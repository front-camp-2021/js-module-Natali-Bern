import { debounce } from '../../module-1/debounce/index.js';

export default class Search {
  element;
  subElements = {};

  constructor() {
    this.onInitialize();
  }

  onInitialize() {
    this.render();
    this.getSubElements();
    this.initializeEvents();
  }

  get searchTemplate() {
    return `
    <form>
    <div class="form__search-input use-icon">
      <input class="search-input" id="search-input"
             type="text"
             placeholder="Search">
      <label class="bi bi-search input-icon"
             for="search-input"></label>
    </div>
  </form>
    `;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.searchTemplate;
    this.element = wrapper.firstElementChild;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    this.subElements = result;
  }

  initializeEvents() {
    this.subElements.search.addEventListener("input", this.keyUpHandler);
  }

  dispatchEvent(searchQuery) {
    this.element.dispatchEvent(
      new CustomEvent("search-filter", {
        bubbles: true,
        detail: searchQuery,
      })
    );
  }

  keyUpHandler = debounce((event) => {
    const searchQuery = event.target.value.trim();

    this.dispatchEvent(searchQuery);
  }, 500);

  clear() {
    this.element.reset();
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}