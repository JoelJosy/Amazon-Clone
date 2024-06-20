export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })
    return cartQuantity;
}

export function addToCart(productId) {
    let matchingItem;

    // check if item already added
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;    
        }
    })

    // use selector
    try {

        const selectorValue = Number(document.
            querySelector(`.js-quantity-selector-${productId}`).value);
            
        // update quantity
        if (matchingItem) {
            matchingItem.quantity += selectorValue;
        } else {
            cart.push({
                productId,
                quantity: selectorValue,
                deliveryOptionId: '1'
            })
        } 
    } catch {
        // update quantity
        if (matchingItem) {
            matchingItem.quantity ++;
        } else {
            cart.push({
                productId,
                quantity: 1,
                deliveryOptionId: '1'
            })
        } 

    }

    saveToStorage();

}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) 
            newCart.push(cartItem);

    })
    cart = newCart;

    saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity;
        }
    })
    
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    // find changed item
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;    
        }
    })

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();

}

export function resetCart() {
    cart = [];
    saveToStorage();
  }