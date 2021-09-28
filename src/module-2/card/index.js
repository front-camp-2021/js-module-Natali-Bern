export default class Card {
  element;

  constructor ({
    id = '',
    images = [],
    title = '',
    rating = 0,
    price = 0,
    category = '',
    brand = ''
  } = {}) {
    this.id = id;
    this.images = images;
    this.title = title;
    this.rating = rating;
    this.price = price;
    this.category = category;
    this.brand = brand;

    this.render();
  }

  getTemplate () {
    return `<div class="product-card">

      <div class="product-card__image" style="background-image: url(${this.images[0]});"></div>

    <div class="product-card__wrapper">

      <div class="product-card__rating rating">
        <div class="rating__count">
            <span>${this.rating}</span>
            <i class="bi bi-star"></i>
        </div>

           <div class="product__price">${this.price}</div>
      </div>
         <h5 class="product-card__name">${this.brand}</h5>
         <p class="product-card__description">${this.title}</p>
  </div>


       <footer class="product-card__buttons">
         <button class="button-wishlist">
           <i class="bi bi-heart product-wish-icon"></i>
           Wishlist
         </button>
         <button class="button-addtocart">
           <i class="bi bi-box-seam product-shopping-bag"></i>
           Add To Cart
         </button>
       </footer>
     </div>`
  }

  render () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  remove () {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
    this.element = null;
  }
}
