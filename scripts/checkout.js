import { loadProductsFetch } from "../data/products.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

async function loadPage() {
    try {
        await loadProductsFetch();
    } catch (error) {
        console.log('Unexpected error.');
    }

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();
