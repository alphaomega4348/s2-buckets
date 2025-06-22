import React from "react";
import "../Css/CheckoutProduct.css"; // your existing CSS

export default function CheckoutProduct({ image, title, price, rating, badge_id }) {
  // badge_id can be used to show eco‐badge if you like…

  return (
    <div className="checkoutProduct">
      {/* Here we truly render the passed URL */}
      <img
        src={image}
        alt={title}
        className="checkoutProduct__image"
      />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span key={i}>⭐</span>
            ))}
        </div>
        {badge_id && <p className="ecofriendly">Eco-Friendly</p>}
        <button onClick={() => {/* dispatch remove logic if needed */ }}>
          Remove from basket
        </button>
      </div>
    </div>
  );
}
