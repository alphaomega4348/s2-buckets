import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaStar, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const IMAGE_BASE = 'http://localhost:8080/uploads';

function OrderedProduct({
  id,
  image,
  title,
  price,
  rating = 4,
  badge_id,
  totalAmount,
  quantity,
  deliveryDate,
  onReturn,
  onReview,
  onReturnBox,
}) {
  const [showOkText, setShowOkText] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const filename = image?.split(/[/\\]/).pop() || "";
  const src = `${IMAGE_BASE}/${filename}`;

  const eco_friendly = badge_id > 0 ? "Eco-Friendly" : "";

  const handleReturnButtonClick = () => {
    setShowOkText(true);
    setButtonDisabled(true);
    if (onReturnBox) onReturnBox();
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "center",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 22px #bdebdc1a",
        marginBottom: 32,
        padding: "28px 32px",
        position: "relative",
        minWidth: 320,
        maxWidth: 870,
        width: "100%",
        margin: "0 auto",
      }}
    >
      {/* Product Image */}
      <div>
        <img
          src={image || src}
          alt={title}
          style={{
            width: 130,
            height: 130,
            objectFit: "cover",
            borderRadius: 14,
            border: "1.5px solid #e8ece7",
            background: "#f9faf8",
          }}
          onError={e => (e.currentTarget.src = src)}
        />
      </div>

      {/* Info Block */}
      <div style={{ flex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#26323a" }}>
            {title}
          </span>
          {eco_friendly && (
            <span style={{
              background: "#e0faea",
              color: "#28a94a",
              fontWeight: 600,
              fontSize: 13,
              borderRadius: 13,
              padding: "3px 12px",
              marginLeft: 9,
              display: "flex",
              alignItems: "center",
              gap: 3
            }}>
              <FaCheckCircle style={{ fontSize: 15, color: "#34bc77" }} /> {eco_friendly}
            </span>
          )}
        </div>
        <div style={{ color: "#576178", margin: "5px 0 7px 0", fontSize: 17 }}>
          <FaCalendarAlt style={{ fontSize: 16, color: "#82b37d", marginRight: 6 }} />
          Delivery: <b>{deliveryDate}</b>
        </div>
        <div style={{ margin: "2px 0 0 0", color: "#7c878c", fontSize: 15 }}>
          <span>Qty: <b>{quantity}</b></span>
          {" | "}
          <span>Total Paid: <b>₹{totalAmount}</b></span>
        </div>
        <div style={{ margin: "10px 0 0 0" }}>
          <span style={{ color: "#3d464f", fontWeight: 500, fontSize: 16 }}>Unit Price: </span>
          <span style={{ color: "#178c5a", fontWeight: 700, fontSize: 18 }}>₹{price}</span>
        </div>
        <div style={{ margin: "5px 0 0 0", display: "flex", gap: 3 }}>
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} style={{ color: "#f5c244", fontSize: 17, verticalAlign: "middle" }} />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 13, minWidth: 200 }}>
        <button
          className="nor"
          style={{
            background: "#ffc278",
            color: "#232d2c",
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            padding: "12px 0",
            marginBottom: 2,
            fontSize: 16,
            boxShadow: "0 2px 8px #f9e3b1",
            cursor: "pointer"
          }}
          onClick={onReturn}
        >
          Return or Replace items
        </button>
        <button
          className="nor"
          style={{
            background: "#ffc278",
            color: "#232d2c",
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            padding: "12px 0",
            marginBottom: 2,
            fontSize: 16,
            boxShadow: "0 2px 8px #f9e3b1",
            cursor: "pointer"
          }}
          onClick={onReview}
        >
          Write a product review
        </button>
        <button
          className={`grn ${isButtonDisabled ? "disabled" : ""}`}
          style={{
            background: "#61c13d",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            padding: "12px 0",
            marginBottom: 2,
            fontSize: 16,
            boxShadow: "0 2px 8px #b8f5c3",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
            opacity: isButtonDisabled ? 0.65 : 1,
          }}
          onClick={handleReturnButtonClick}
          disabled={isButtonDisabled}
        >
          <FaBoxOpen style={{ fontSize: 18, marginRight: 7, verticalAlign: "middle" }} />
          Return the Box
        </button>
        {showOkText && (
          <div style={{ color: "#348972", fontSize: 13, marginTop: 7 }}>
            *We will let you know when the threshold of your area is reached. <br />
            <Link to="/education">
              <span style={{ color: "#218ee4", textDecoration: "underline", cursor: "pointer" }}>Learn more</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderedProduct;
