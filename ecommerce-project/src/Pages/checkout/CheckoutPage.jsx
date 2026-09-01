import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader.jsx";
import { formatMoney } from "../../utils/money.js";

export function CheckoutPage({ cartItems }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummery, setPaymentSummery] = useState(null);
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummery(response.data);
    });
  }, []);
  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="images/favicon/cart-favicon.png"
      />
      <title>Checkout</title>
      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 &&
              cartItems.map((item) => {
                const selectedDeliveryOption = deliveryOptions.find(
                  (deliveryOption) =>
                    deliveryOption.id === item.deliveryOptionId,
                );

                return (
                  <div key={item.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {selectedDeliveryOption
                        ? dayjs(
                            selectedDeliveryOption.estimatedDeliveryTimeMs,
                          ).format("dddd, MMMM D")
                        : "TBD"}
                    </div>

                    <div className="cart-item-details-grid">
                      <img className="product-image" src={item.product.image} />

                      <div className="cart-item-details">
                        <div className="product-name">{item.product.name}</div>
                        <div className="product-price">
                          {formatMoney(item.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity: <span className="quantity-label"></span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.map((deliveryOption) => {
                          let priceString = "FREE Shipping";

                          if (deliveryOption.priceCents > 0) {
                            priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                          }

                          return (
                            <div
                              key={deliveryOption.id}
                              className="delivery-option"
                            >
                              <input
                                type="radio"
                                checked={
                                  deliveryOption.id === item.deliveryOptionId
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${item.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    deliveryOption.estimatedDeliveryTimeMs,
                                  ).format("dddd, MMMM D")}
                                </div>
                                <div className="delivery-option-price">
                                  {priceString}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {paymentSummery && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummery.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummery.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummery.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummery.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummery.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummery.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
