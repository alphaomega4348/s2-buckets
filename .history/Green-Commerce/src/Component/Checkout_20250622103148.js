import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { motion } from "framer-motion";

export default function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const [selectedItems, setSelectedItems] = useState(
    basket.reduce((acc, item) => ({ ...acc, [item.productId]: true }), {})
  );

  const toggleSelect = (id) =>
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const removeSelected = () => {
    Object.keys(selectedItems).forEach((id) => {
      if (selectedItems[id]) {
        dispatch({ type: "REMOVE_FROM_BASKET", id: Number(id) });
      }
    });
  };

  const itemsSelectedCount = Object.values(selectedItems).filter(Boolean)
    .length;

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: 32 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <input
          type="checkbox"
          checked={itemsSelectedCount === basket.length}
          onChange={() => {
            const all = itemsSelectedCount !== basket.length;
            const sel = {};
            basket.forEach((i) => (sel[i.productId] = all));
            setSelectedItems(sel);
          }}
          style={{ width: 20, height: 20, accentColor: "#48BB78" }}
        />
        <strong>
          {itemsSelectedCount}/{basket.length} ITEMS SELECTED
        </strong>
        <button
          onClick={removeSelected}
          style={{
            marginLeft: 24,
            background: "none",
            border: "none",
            color: "#E53E3E",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          REMOVE
        </button>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#3182CE",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          MOVE TO WISHLIST
        </button>
      </div>

      {/* Products & Sidebar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: "flex", gap: 24 }}
      >
        {/* Products List */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {basket.map((item) => (
            <div
              key={item.productId}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                padding: 16,
                background: "#FFF",
                borderRadius: 8,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <input
                type="checkbox"
                checked={!!selectedItems[item.productId]}
                onChange={() => toggleSelect(item.productId)}
                style={{ width: 20, height: 20, accentColor: "#48BB78" }}
              />
              <CheckoutProduct
                id={item.productId}
                image={item.productImage}    // <-- full URL here
                title={item.productName}
                price={item.price}
                rating={parseInt(item.grade) || 5} // fallback to 5 stars
                badge_id={item._id}          // use _id directly
              />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 24 }}>
          <Subtotal />
        </div>
      </motion.div>
    </div>
  );
}
