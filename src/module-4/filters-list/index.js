export default class FiltersList {
    element;  

    
    
  constructor({
    title = '',
    list = []
  } = {}) {
    

    this.title = title;
    this.list = list;
    this.render();
    this.getSubElements();
    this.addEventListeners();
  }

  

  get template() {
    return `
      <form class="filters__container-content">
        <h3 class="form__group-title">${this.title}</h3>

        <div data-element="body">${this.body}</div>
      </form>
    `;
  }

  get body() {
    const result = this.list.map(item => {
      return `<div class="filters__container-item">
        <div class="form__checkbox">
          <input id="${item.value}" type="checkbox" name="filter" value="${item.value}" ${item.checked ? "checked" : ''}>
          <label for="${item.value}">${item.title}</label>
        </div>
      </div>`;
    });
    return result.join('');
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  update(list) {
    this.list = list;
    this.subElements.body.innerHTML = this.body;
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

  reset() {
    this.element.reset();
  }

  addEventListeners() {
    this.element.addEventListener('change', event => {
      const {
        target
      } = event;
      const eventName = target.checked ? 'add-filter' : 'remove-filter';
      this.element.dispatchEvent(new CustomEvent(eventName, {
        bubbles: true,
        detail: target.value
      }));
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
  }

}










