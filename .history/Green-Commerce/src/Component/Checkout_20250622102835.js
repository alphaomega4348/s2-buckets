import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
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
    gap: 16,
    padding: 16,
    background: "#FFF",
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  sidebar: {
    flexBasis: "33%",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  section: {
    padding: 24,
    background: "#FFF",
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  sectionTitle: { marginBottom: 8, fontWeight: 600, color: "#2D3748" },
  input: {
    flex: 1,
    padding: 8,
    border: "1px solid #E2E8F0",
    borderRadius: 4,
    outline: "none",
  },
  button: { padding: "10px 16px", borderRadius: 4, cursor: "pointer", transition: "all 0.2s" },
  btnApply: { background: "#ED64A6", color: "#FFF", border: "none" },
  btnRemove: {
    color: "#E53E3E",
    background: "transparent",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
  },
  donationBtn: (isActive) => ({
    padding: "6px 12px",
    borderRadius: 20,
    border: "1px solid #D2D6DC",
    cursor: "pointer",
    background: isActive ? "#48BB78" : "transparent",
    color: isActive ? "#FFF" : "#4A5568",
  }),
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4,
    color: "#4A5568",
  },
  totalRow: { display: "flex", justifyContent: "space-between", marginTop: 12, fontWeight: 700, fontSize: 18 },
  actionContainer: { display: "flex", gap: 16 },
  btnYellow: { flex: 1, background: "#F6E05E", color: "#2D3748", border: "none" },
  btnGreen: { flex: 1, background: "#48BB78", color: "#FFF", border: "none" },
};

export default function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const [address, setAddress] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    basket.reduce((acc, item) => ({ ...acc, [item.productId]: true }), {})
  );
  const [couponCode, setCouponCode] = useState("");
  const [donation, setDonation] = useState(0);

  const toggleSelect = (id) =>
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  const removeSelected = () => {
    Object.keys(selectedItems).forEach((id) => {
      if (selectedItems[id]) {
        dispatch({ type: "REMOVE_FROM_BASKET", id: Number(id) });
      }
    });
  };
  const itemsSelectedCount = Object.values(selectedItems).filter(Boolean).length;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <input
            type="checkbox"
            checked={itemsSelectedCount === basket.length}
            onChange={() => {
              const all = itemsSelectedCount !== basket.length;
              const newSel = {};
              basket.forEach((item) => (newSel[item.productId] = all));
              setSelectedItems(newSel);
            }}
            style={styles.checkbox}
          />
          <span style={{ fontWeight: 600 }}>
            {itemsSelectedCount}/{basket.length} ITEMS SELECTED
          </span>
          <button onClick={removeSelected} style={styles.btnRemove}>
            REMOVE
          </button>
          <button style={{ ...styles.btnRemove, color: "#3182CE" }}>
            MOVE TO WISHLIST
          </button>
        </div>
      </div>

      {/* Products & Sidebar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", gap: 24, flexWrap: "wrap" }}
      >
        {/* Products */}
        <div style={styles.productsContainer}>
          {basket.map((item) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={styles.productCard}
            >
              <input
                type="checkbox"
                checked={!!selectedItems[item.productId]}
                onChange={() => toggleSelect(item.productId)}
                style={styles.checkbox}
              />
              <CheckoutProduct
                id={item.productId}
                price={item.price}
                rating={item.grade}
                image={item.productImage}     // <-- full URL
                title={item.productName}
                badge_id={item._id}           // <-- pass _id directly
              />
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* ...coupons, donation, address, price details, actions... */}
          <Subtotal />
          {/* (rest unchanged) */}
        </div>
      </motion.div>

      {/* Address Modal */}
      {showAddressModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          {/* ...modal contents... */}
        </div>
      )}
    </div>
  );
}
