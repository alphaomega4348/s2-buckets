import React, { useState } from "react";
import { Link } from "react-router-dom";
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

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const [address, setAddress] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    basket.reduce((acc, item) => ({ ...acc, [item.productId]: true }), {})
  );
  const [couponCode, setCouponCode] = useState("");
  const [donation, setDonation] = useState(0);

  const toggleSelect = (id) => setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
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
      {/* Selection Header */}
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
          <button style={{ ...styles.btnRemove, color: "#3182CE" }}>MOVE TO WISHLIST</button>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", gap: 24, flexWrap: "wrap" }}
      >
        {/* Products List */}
        <div style={styles.productsContainer}>
          {basket.map((item) => (
            console.log("item ",item),
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
                  id={item.id}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                  title={item.title}
                  badge_id={item.badge_id}
                  subtitle={item.subtitle}
                  originalPrice={item.originalPrice}
                  

                />
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Coupons */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>COUPONS</h3>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Apply Coupons"
                style={styles.input}
              />
              <button style={{ ...styles.button, ...styles.btnApply }}>APPLY</button>
            </div>
          </div>

          {/* Donation */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA</h3>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" style={styles.checkbox} /> Donate and make a difference
            </label>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {[10, 20, 50, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => setDonation(val)}
                  style={styles.donationBtn(donation === val)}
                >
                  ₹{val}
                </button>
              ))}
            </div>
          </div>

          {/* Address & Price Details */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Delivery Address</h3>
            {address ? (
              <p>{address}</p>
            ) : (
              <button
                onClick={() => setShowAddressModal(true)}
                style={{
                  ...styles.button,
                  color: "#48BB78",
                  background: "transparent",
                  border: "none",
                  textDecoration: "underline",
                }}
              >
                Enter Address
              </button>
            )}

            <h3 style={{ ...styles.sectionTitle, marginTop: 16 }}>
              PRICE DETAILS ({basket.length} Items)
            </h3>
            <div>
              <div style={styles.summaryRow}>
                <span>Total MRP</span>
                <span>₹{basket.reduce((sum, i) => sum + i.price, 0)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Discount on MRP</span>
                <span style={{ color: "#48BB78" }}>-₹{/* discount */}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Coupon Discount</span>
                <span>Apply Coupon</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Platform Fee</span>
                <span style={{ color: "#48BB78" }}>FREE</span>
              </div>
              <div style={styles.totalRow}>
                <span>Total Amount</span>
                <span>₹{/* total */}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.actionContainer}>
            <button style={{ ...styles.button, ...styles.btnYellow }}>Place Standard Order</button>
            <button style={{ ...styles.button, ...styles.btnGreen }}>Start Group Order</button>
          </div>
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
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#FFF",
              borderRadius: 8,
              padding: 24,
              width: "100%",
              maxWidth: 400,
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
              Set Delivery Address
            </h2>
            <textarea
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address..."
              style={{
                width: "100%",
                padding: 8,
                border: "1px solid #E2E8F0",
                borderRadius: 4,
                outline: "none",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 16 }}>
              <button
                onClick={() => setShowAddressModal(false)}
                style={{ padding: "8px 12px", borderRadius: 4, background: "#E2E8E0", border: "none" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddressModal(false)}
                style={{ padding: "8px 12px", borderRadius: 4, background: "#48BB78", color: "#FFF", border: "none" }}
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
