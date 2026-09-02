import axios from "axios";
import { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader.jsx";
import { OrderSummary } from "./OrderSummary.jsx";
import { PaymentSummary } from "./PaymentSummary.jsx";

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
         <OrderSummary
           cartItems={cartItems}
           deliveryOptions={deliveryOptions}
         />

         <PaymentSummary paymentSummery={paymentSummery} />
        </div>
      </div>
    </>
  );
}
