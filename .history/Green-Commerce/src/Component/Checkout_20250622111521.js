import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { motion } from "framer-motion";

const styles = {
  container: { maxWidth: 1024, margin: "0 auto", padding: "32px 16px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    color: "#4A5568",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 16 },
  checkbox: { width: 20, height: 20, accentColor: "#48BB78" },
  productsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    flex: 1,
  },
  productCard: {
    display: "flex",
    gap: 18,
    padding: "0",
    background: "transparent",
    borderRadius: 0,
    boxShadow: "none",
    alignItems: "flex-start",
    minWidth: 0,
    position: "relative",
  },
};

export default function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  // Use basket index for selection mapping
  const [selectedItems, setSelectedItems] = useState(
    basket.reduce((acc, _, idx) => ({ ...acc, [idx]: true }), {})
  );
  const itemsSelectedCount = Object.values(selectedItems).filter(Boolean).length;

  // Remove by index (so duplicate items can be removed independently)
  const removeSelected = () => {
    // Remove from last to first to avoid index shift
    const toRemove = Object.keys(selectedItems)
      .filter((idx) => selectedItems[idx])
      .map(Number)
      .sort((a, b) => b - a);
    toRemove.forEach((idx) => {
      dispatch({ type: "REMOVE_FROM_BASKET", idx });
    });
    // Update selected after removal
    setSelectedItems({});
  };

  // Select/Deselect all logic
  const handleSelectAll = () => {
    const all = itemsSelectedCount !== basket.length;
    const newSel = {};
    basket.forEach((_, idx) => (newSel[idx] = all));
    setSelectedItems(newSel);
  };

  return (
    <div style={styles.container}>
      {/* Selection Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <input
            type="checkbox"
            checked={itemsSelectedCount === basket.length && basket.length !== 0}
            onChange={handleSelectAll}
            style={styles.checkbox}
          />
          <span style={{ fontWeight: 600 }}>
            {itemsSelectedCount}/{basket.length} ITEMS SELECTED
          </span>
          <button onClick={removeSelected} style={{ color: "#E53E3E", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}>
            REMOVE
          </button>
          <button style={{ color: "#3182CE", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}>
            MOVE TO WISHLIST
          </button>
        </div>
      </div>

      {/* Products List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        <div style={styles.productsContainer}>
          {basket.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={styles.productCard}
            >
              <input
                type="checkbox"
                checked={!!selectedItems[idx]}
                onChange={() =>
                  setSelectedItems((prev) => ({ ...prev, [idx]: !prev[idx] }))
                }
                style={styles.checkbox}
              />
              <CheckoutProduct
                {...item}
                onRemove={() => {
                  dispatch({ type: "REMOVE_FROM_BASKET", idx });
                  // Also remove from selection to avoid key shift issue
                  setSelectedItems((prev) => {
                    const updated = { ...prev };
                    delete updated[idx];
                    return updated;
                  });
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
