import { products, loadProductsFetch } from "../data/products.js";
import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";

loadProductsFetch().then(renderProductsGrid);

function renderProductsGrid() {

    let productsHTML = '';

    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    let filteredProducts = products;

    if (search) {
        filteredProducts = products.filter((product) => {
          return product.name.toLowerCase().includes(search.toLowerCase());
        });
    }


    filteredProducts.forEach((product) => {
        productsHTML += `<div class="product-container">
        <div class="product-image-container">
            <img
                class="product-image"
                src="${product.image}"
            />
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img
                class="product-rating-stars"
                src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
        </div>

        <button class="add-to-cart-button js-add-to-cart-button
        button-primary" data-product-id="${product.id}">
            Add to Cart
        </button>
    </div>`
    }
    )

    document.querySelector('.js-products-grid').
    innerHTML = productsHTML;

    const timeoutList = {};

    document.querySelector('.js-card-quantity')
    .innerHTML = calculateCartQuantity();

    function updateCardQuantity(productId) {
        // update icon cart quantity 
        document.querySelector('.js-card-quantity')
        .innerHTML = calculateCartQuantity();

        // added to cart message
        const addedMessage = document.
        querySelector(`.js-added-to-cart-${productId}`);

        if (timeoutList[productId]) {
            clearTimeout(timeoutList[productId])
        }

        addedMessage.classList.add("added-to-cart-visible");

        const timeout = setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');
        }, 2000);
        timeoutList[productId] = timeout;
    }



    document.querySelectorAll('.js-add-to-cart-button').forEach (
        (button) => {
            button.addEventListener('click', () => {
                const {productId} = button.dataset;

                addToCart(productId);
                updateCardQuantity(productId);

            });
        });
    
    document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });

}