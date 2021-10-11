// import Card from './../../module-2/card/index.js';

export default class CardsList {
   element;

   constructor({ data = [], Component = {} }) {
     this.data = data;
     this.Component = Component;

     this.render();
     this.getSubElements();
     this.update(this.data);
   }

   getTemplate() {
     return `<div>
       <h1>This is CardList component</h1>
       <div class="product-list" data-element="body"></div>
     </div>`;
   }

   render () {
     const wrapper = document.createElement ('div');

     wrapper.innerHTML = this.getTemplate;

     this.element = wrapper.firstElementChild;
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

   update (data = []) {
     this.data = data;
     const cards = data.map(item => {
       return new this.Component(item).element;
     });

     if (cards.length) {
       this.subElements.body.replaceChildren(...cards);
     } else {
       this.subElements.body.innerText = 'No products found';
     };

    //  this.getSubElement(this.element, this.data);
   }

   remove () {
     if (this.element) {
       this.element.remove();
     }
   }

   destroy () {
     this.remove();
     this.element = null;
    //  this.subElements = {};
   }

 }





// export default class CardsList {
//   element;

//   constructor({ data = [], Component = {} }) {
//     this.data = data;
//     this.Component = Component;

//     this.render();
//   }

//   render() {
//     const listWrapper = document.createElement("div");
//     listWrapper.classList.add("product-list");

//     this.element = listWrapper;
//     this.buildCardsList(this.element, this.data);
//   }

//   buildCardsList(wrapper, cardsData) {
//     if (cardsData.length < 1) return;

//     cardsData.forEach((item) => {
//       let { element } = new this.Component(item);

//       if (element) {
//         wrapper.append(element);
//       }
//     });
//   }

//   update(updateData) {
//     if (!this.element) return;
//     this.element.innerHTML = "";
//     this.data = updateData;

//     this.buildCardsList(this.element, this.data);
//   }

//   remove() {
//     if (this.element) {
//       this.element.remove();
//     }
//   }

//   destroy() {
//     this.remove();
//     this.element = null;
//   }
// }