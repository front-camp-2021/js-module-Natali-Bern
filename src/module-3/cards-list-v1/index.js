// import Card from '../../module-2/card/index.js';

export default class CardsList {
  element;

    // ... your logic

    constructor({ data = [], Component = {} }) {
      this.data = data;
      this.Component = Component;
  
      this.render();
    }

    getTemplate() {
      return `<div class="product-list">
         ${this.data.map(d => new this.Component(d).element.innerHTML).join('')}
         </div>`
       }

    render() {
      const pageWrapper = document.createElement('div');
        
      pageWrapper.innerHTML = this.getTemplate();
      this.element = pageWrapper;
      }

    update(arr) {
      this.data = arr;
      this.render();
    }

    remove() {
     if (this.element) {
     this.element.remove();
      }
    }

    destroy() {
      this.remove();
     this.element = null;
  }
}
