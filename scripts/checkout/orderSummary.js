import { cart, removeFromCart, calculateCartQuantity,
    updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption }
 from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {

   let cartSummaryHTML = '';

   
   cart.forEach((cartItem) => {
       const productId = cartItem.productId;
   
       // get full product details
       let matchingProduct = getProduct(productId);
   
       // generate delivery-date header hmtl
       const deliveryOptionId = cartItem.deliveryOptionId;
   
       const deliveryOption = getDeliveryOption(deliveryOptionId);
   
       const dateString = calculateDeliveryDate(deliveryOption);

   
       cartSummaryHTML += `<div class="cart-item-container
       js-cart-item-container-${matchingProduct.id}">
       <div class="delivery-date">
           Delivery date: ${dateString}
       </div>
   
       <div class="cart-item-details-grid">
           <img
               class="product-image"
               src="${matchingProduct.image}"
           />
   
           <div class="cart-item-details">
               <div class="product-name">
                   ${matchingProduct.name}
               </div>
               <div class="product-price">${matchingProduct.getPrice()}</div>
               <div class="product-quantity">
                   <span>
                       Quantity:
                       <span class="quantity-label
                       js-quantity-label-${matchingProduct.id}">
                       ${cartItem.quantity}</span>
                   </span>
                   <span
                       class="update-quantity-link link-primary
                       js-update-quantity-link"
                       data-product-id="${matchingProduct.id}"
                   >
                       Update
                   </span>
                   <input class="quantity-input 
                   js-quantity-input-${matchingProduct.id}">
                   <span class="save-quantity-link link-primary
                   js-save-quantity-link"
                   data-product-id="${matchingProduct.id}">
                       Save
                   </span>
                   <span
                       class="delete-quantity-link link-primary 
                       js-delete-link" data-product-id="${matchingProduct.id}"
                   >
                       Delete
                   </span>
               </div>
           </div>
   
           <div class="delivery-options">
               <div class="delivery-options-title">
                   Choose a delivery option:
               </div>
               ${deliveryOptionsHTML(matchingProduct, cartItem)}
           </div>
       </div>
   </div>`
   })
   
   
   // generate radio button html
   function deliveryOptionsHTML(matchingProduct, cartItem) {
       let html = '';
   
       deliveryOptions.forEach((deliveryOption) => {
           const dateString = calculateDeliveryDate(deliveryOption);
           
           const priceString = deliveryOption.priceCents === 0
           ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;
           
           const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
   
   
           html += `
               <div class="delivery-option js-delivery-option"
               data-product-id="${matchingProduct.id}"
               data-delivery-option-id="${deliveryOption.id}">
                   <input
                       type="radio"
                       ${isChecked ? 'checked' : ''}
                       class="delivery-option-input"
                       name="delivery-option-${matchingProduct.id}"
                   />
                   <div>
                       <div class="delivery-option-date">
                           ${dateString}
                       </div>
                       <div class="delivery-option-price">
                           ${priceString} Shipping
                       </div>
                   </div>
               </div>
           `
       })
   
       return html;
       
   }
   
   
   document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
   
   // delete link
   document.querySelectorAll('.js-delete-link').forEach((link) => {
           link.addEventListener('click', () => {
               const productId = link.dataset.productId;
               removeFromCart(productId);
        
               renderCheckoutHeader();
               renderOrderSummary();
               renderPaymentSummary();
           })
       })
   
   // update link
   document.querySelectorAll('.js-update-quantity-link')
   .forEach((link) => {
       link.addEventListener('click', () => {
           const productId = link.dataset.productId;
           const cartItemContainer = document
           .querySelector(`.js-cart-item-container-${productId}`);
   
           cartItemContainer.classList.add("is-editing-quantity");
       })
   })
   
   // save link
   document.querySelectorAll('.js-save-quantity-link')
   .forEach((link) => {
       link.addEventListener('click', () => {
           const productId = link.dataset.productId;
   
           let newQuantity = Number(document
               .querySelector(`.js-quantity-input-${productId}`).value);
   
           if (newQuantity <= 0 || newQuantity >= 1000) {
               alert('Quantity must be at least 0 and less than 1000');
               return;
           }
   
           
           updateQuantity(productId, newQuantity);
   
   
           const cartItemContainer = document
           .querySelector(`.js-cart-item-container-${productId}`);
   
           cartItemContainer.classList.remove("is-editing-quantity");
   
           document.querySelector(`.js-quantity-label-${productId}`)
           .innerHTML = newQuantity;

            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
           
       })
   })
   
   // delivery option listener
   document.querySelectorAll('.js-delivery-option')
   .forEach((element) => {
       element.addEventListener('click', () => {
           const {productId, deliveryOptionId} = element.dataset;
           updateDeliveryOption(productId, deliveryOptionId);
           renderOrderSummary();
           renderPaymentSummary();
       })
   })
}
