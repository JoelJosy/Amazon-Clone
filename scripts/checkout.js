import { loadProductsFetch } from "../data/products.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

async function loadPage() {
    await loadProductsFetch();

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();
