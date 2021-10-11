import FiltersList from "../filters-list/index.js";
import DoubleSlider from "../../module-5/double-slider/index.js";

export default class SideBar {
  element;
  sidebarItems = {};

  constructor(categoriesFilter = [], brandFilter = []) {
    this.categoriesFilter = categoriesFilter;
    this.brandFilter = brandFilter;

    this.createSidebarItems();
    this.render();
    this.insertSidebarItems();
    this.addEventListeners();
  }

  createSidebarItems() {
    const categoryFilterItem = new FiltersList({
      title: "Category",
      list: this.categoriesFilter,
    });

    const brandFilterItem = new FiltersList({
      title: "Brand",
      list: this.brandFilter,
    });

    const priceFilterItem = new DoubleSlider({
      min: 0,
      max: 85000,
      filterName: "price",
      formatValue(value) {
        return `${value} UAH`;
      },
    });

    const ratingFilterItem = new DoubleSlider({
      min: 0,
      max: 5,
      precision: 2,
      filterName: "rating",
    });

    this.sidebarItems = {
      priceFilterItem,
      brandFilterItem,
      categoryFilterItem,
      ratingFilterItem,
    };
  }

  insertSidebarItems() {
    const sidebarItemsWrapper = this.element.querySelector(".filter__body");

    Object.keys(this.sidebarItems).forEach((item) => {
      const { element } = this.sidebarItems[item];

      if (element) {
        sidebarItemsWrapper.append(element);
      }
    });
  }

  update(categoriesFilter = [], brandFilter = []) {
    this.sidebarItems.brandFilterItem.update(brandFilter);
    this.sidebarItems.categoryFilterItem.update(categoriesFilter);
  }

  get sidebarTemplate() {
    return `
      <div class="filters__container">
        <div class="filters__container-header">
          <h3 class="filters__container-title">Filters</h3>
          <button class="btn-white toggle__filters">
          <img src="images/chevrons-right.svg" alt="chevrons-right">
          </button>
        </div>
        <div class="filters__container-content">
        </div>
        <button id="clearFilters" class="btn-primary clear__filters">Clear all filters</button>
      </div>
    `;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.sidebarTemplate;

    this.element = wrapper.firstElementChild;
  }

  addEventListeners() {
    const clearFilters = this.element.querySelector("#clearFilters");

    const customDispatch = (event) => {
      this.element.dispatchEvent(
        new CustomEvent("filter-selected", {
          bubbles: true,
          detail: event.detail,
        })
      );
    };

    clearFilters.addEventListener("pointerdown", () => {
      for (const item of Object.values(this.sidebarItems)) {
        item.reset();
      }

      this.element.dispatchEvent(
        new CustomEvent("clear-filters", {
          bubbles: true,
        })
      );
    });

    this.element.addEventListener("add-filter", customDispatch);
    this.element.addEventListener("remove-filter", customDispatch);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.sidebarItems = {};
  }
}








