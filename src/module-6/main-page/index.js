import Card from "../../module-2/card/index.js";
import CardsList from "../../module-3/cards-list-v1/index.js";
import Pagination from "../../module-5/pagination/index.js";
import SideBar from "../../module-4/side-bar/index.js";
import Search from "../search/index.js";
import { request } from "./request/index.js";
import { prepareFilters } from "./prepare-filters/index.js";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export default class Page {
  element;
  subElements = {};
  components = {};
  pageLimit = 10;
  totalPages = 100;
  filters = new URLSearchParams();

  constructor() {
    this.filters.set("_page", "1");
    this.filters.set("_limit", this.pageLimit);
    this.onInitialize();
  }

  onInitialize() {
    this.render();
    this.getSubElements();
    this.initializeComponents();
    this.renderComponents();
    this.initializeRequestedData();
    this.initializeEvents();
  }

  /**
   * Template Rendering
   */
  get template() {
    return `
    <div class="wrapper">
      <header class="header">
        <div class="header__logo">
          <img src="./images/logo.svg" class="header__logo-img" alt="Store Logo"></img>
          <div class="header__logo-text">Online Store</div>
        </div>
      </header>
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a href="/" class="breadcrumbs__home"></a>
        </li>
        <li class="breadcrumbs__item">
          <a href="/eCommerce" class="breadcrumbs__link">eCommerce</a>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__current">Electronics</span>
        </li>
      </ul>
      <div class="category">
        <div class="category__row">
          <aside class="category__sidebar" data-element="sidebar">
            <!-- SideBar -->
          </aside>
          <main class="category__main">
            <div class="search">
              <div class="search__results">
                <span class="search__results-text">7,618 results found</span>
                <button class="button button_icon button_primary  favorites">
                  <img src="./images/icons/heart-white.svg" alt="Add favorites">
                </button>
              </div>
              <div data-element="search">
              </div>
              <!-- Search -->
            </div>
            <div data-element="cardslist">
            <!-- Products -->
            </div>
          </main>
        </div>
      </div>
      <div data-element="pagination">
      <!-- pagination -->
      </div>
    </div>
    `;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.template;
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

  initializeComponents() {
    const search = new Search();
    const cardslist = new CardsList({ data: [], Component: Card });
    const sidebar = new SideBar();
    const pagination = new Pagination();

    this.components = {
      search,
      cardslist,
      sidebar,
      pagination,
    };
  }

  renderComponents() {
    Object.keys(this.components).forEach((component) => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      if (element) {
        root.append(element);
      }
    });
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
    this.filters = new URLSearchParams();

    for (const component of Object.values(this.components)) {
      component.destroy();
    }

    this.components = {};
  }
}