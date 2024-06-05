export let cart = [];
export function addToCart(productId) {
    let matchingItem;

    // check if item already added
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;    
        }
    })

    // use selector
    const selectorValue = Number(document.
        querySelector(`.js-quantity-selector-${productId}`).value);
        
    // update quantity
    if (matchingItem) {
        matchingItem.quantity += selectorValue;
    } else {
        cart.push({
            productId,
            quantity: selectorValue
        })
    } 

}
