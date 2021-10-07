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
        <div class="product-card__inner">
            <div class="product-card__image" style="background-image: url(${this.images[0]})"></div>
            <div class="product-card__wrapper">
                <div class="product-card__rating rating">
                    <span class="rating__count">${this.rating}</span>
                    <i class="bi bi-star"></i>
                </div>
                <div class="rating__price">${this.price}</div>
            </div>
            <h3 class="product-card__name">${this.brand}</h3>
            <div class="product-card__description">${this.title}-${this.category}</div>
        </div>
            <div class="product-card__buttons">
                <button class="button-wishlist">
                    <i class="bi bi-heart os-product-wish-icon"></i>
                    <span class="button-wishlist__text">Wishlist</span>
                </button>
                <button class="button-addtocart">
                <i class="bi bi-box-seam os-product-shopping-bag"></i>
                    <span class="button-addtocart__text">Add to Cart</span>
                </button>
            </div>
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
