export default class Pagination {
  element;
  subElements = {};
  start = 1;

  
  constructor({
    totalPages = 10,
    page = 1
  } = {}) {
 

    this.totalPages = totalPages;
    this.pageIndex = page - 1;
    this.initialize();
  }

  initialize() {
    this.render();
    this.getSubElements();
    this.addEventListeners();
    this.update();
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    this.subElements = result;
  }

  get template() {
    return `
    <div class="pagination">
      <a href="#" class="pagination__link pagination__prev" data-element="nav-prev">
        <i class="bi bi-chevron-left"></i>
      </a>

      <div class="pagination__group" data-element="pagination">
        <a href="#" class="pagination__link" data-element="nav-prev"></a>
      </div>

      <a href="#" class="pagination__link pagination__next" data-element="nav-next">
        <i class="bi bi-chevron-right"></i>
      </a>
    </div>
    `;
  }

  goToPrevPage() {
    if (this.pageIndex - 1 >= 0) {
      this.dispatchEvent(this.pageIndex - 1);
    }
  }

  goToNextPage() {
    if (this.pageIndex + 1 < this.totalPages) {
      this.dispatchEvent(this.pageIndex + 1);
    }
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  addEventListeners() {
    this.element.addEventListener('pointerdown', event => {
      const navElement = event.target.closest('[data-element^="nav-"]');

      if (navElement) {
        const type = navElement.dataset.element;

        if (type === 'nav-prev') {
          this.goToPrevPage();
        }

        if (type === 'nav-next') {
          this.goToNextPage();
        }
      }
    });
    this.element.addEventListener('pointerdown', event => {
      const pageIndex = parseInt(event.target.dataset.pageIndex, 10);

      if (!isNaN(pageIndex) && this.pageIndex !== pageIndex) {
        this.pageIndex = pageIndex;
        this.dispatchEvent(pageIndex);
      }
    });
    document.addEventListener('page-changed', this.onPageChanged);
  }

  update({
    totalPages = this.totalPages,
    page = this.pageIndex + 1
  } = {}) {
    this.totalPages = totalPages;
    this.pageIndex = page - 1;

    if (this.totalPages < 1) {
      this.subElements.pagination.innerHTML = 'No pagination';
      return;
    }

    this.subElements.pagination.innerHTML = this.getPages();
  }

  getPages() {
    const pages = new Array(this.totalPages).fill(true);
    return pages.map((item, index) => {
      const isActive = index === this.pageIndex ? 'active' : '';
      return `<li>
        <a href="#" data-element="page-link" class="page-link ${isActive}" data-page-index="${index}">${index + 1}</a>
      </li>`;
    }).join('');
  }

  dispatchEvent(pageIndex) {
    this.element.dispatchEvent(new CustomEvent('page-changed', {
      bubbles: true,
      detail: pageIndex
    }));
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    document.removeEventListener('page-changed', this.onPageChanged);
  }


}
