import dayjs from "dayjs";
import { formatMoney } from "../../utils/money.js";
import { DeliveryOptions } from "./DeliveryOptions.jsx";
export function OrderSummary({ cartItems, deliveryOptions }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cartItems.map((item) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => deliveryOption.id === item.deliveryOptionId,
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

               <DeliveryOptions deliveryOptions={deliveryOptions} item={item} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
