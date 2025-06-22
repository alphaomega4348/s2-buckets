import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { motion, AnimatePresence } from "framer-motion";

// Gradient, glassy shadows, subtle UI
const styles = {
  container: {
    // maxWidth: 1100,
    width
    margin: "0 auto",
    padding: "40px 0 40px 0",
    minHeight: "100vh",
    background: "linear-gradient(120deg, #f8fbf9 70%, #f3f9f4 100%)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    color: "#374151",
    background: "rgba(255,255,255,0.80)",
    borderRadius: 18,
    boxShadow: "0 4px 24px #bdebdc33",
    padding: "16px 32px 16px 24px",
    position: "sticky",
    top: 0,
    zIndex: 10,
    backdropFilter: "blur(2px)",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 18 },
  checkbox: {
    width: 22,
    height: 22,
    accentColor: "#48BB78",
    borderRadius: 5,
    border: "1.5px solid #bdebdc",
    marginRight: 3,
    transition: "box-shadow 0.15s",
    boxShadow: "0 0 0 1.5px #fff, 0 1px 2px #99c3b9cc",
  },
  productsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
    flex: 1,
    minWidth: 0,
    // marginRight: 18,
    marginTop:10
  },
  productCard: {
    display: "flex",
    gap: 16,
    padding: "18px 18px 18px 10px",
    background: "rgba(255,255,255,0.97)",
    borderRadius: 18,
    boxShadow: "0 4px 24px #bdebdc29, 0 1.5px 6px #d6f5e9a0",
    alignItems: "flex-start",
    minWidth: 0,
    position: "relative",
    transition: "box-shadow 0.19s, transform 0.13s",
    cursor: "pointer",
    border: "1.5px solid #f2f5f5",
  },
  productCardHover: {
    boxShadow: "0 8px 28px #8be4b130, 0 3px 18px #bdebdc40",
    transform: "translateY(-3px) scale(1.008)",
    borderColor: "#bdebdc",
  },
  sidebar: {
    flexBasis: "34%",
    minWidth: 320,
    display: "flex",
    flexDirection: "column",
    gap: 26,
    marginTop: 6,
  },
  section: {
    padding: 26,
    background: "rgba(255,255,255,0.98)",
    borderRadius: 16,
    boxShadow: "0 4px 20px #bdebdc25, 0 1.5px 6px #e6fff1a0",
    marginBottom: 2,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: 700,
    color: "#137a4f",
    fontSize: 18,
    letterSpacing: "0.01em",
  },
  input: {
    flex: 1,
    padding: 9,
    border: "1.5px solid #e1f2e7",
    borderRadius: 6,
    outline: "none",
    fontSize: 15,
    background: "#fafdfb",
    transition: "box-shadow 0.15s",
  },
  button: {
    padding: "11px 18px",
    borderRadius: 5,
    cursor: "pointer",
    transition: "all 0.22s",
    fontWeight: 600,
    fontSize: 15,
    border: "none",
    marginLeft: 1,
    boxShadow: "0 2px 8px #e0f7ee12",
  },
  btnApply: {
    background: "#ED64A6",
    color: "#FFF",
    border: "none",
    marginLeft: 2,
  },
  btnRemove: {
    color: "#e53e3e",
    background: "transparent",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
    fontWeight: 600,
    marginLeft: 14,
    fontSize: 17,
    letterSpacing: "0.01em",
  },
  btnWishlist: {
    color: "#1a74d4",
    background: "transparent",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 17,
    marginLeft: 10,
  },
  donationBtn: (isActive) => ({
    padding: "6px 12px",
    borderRadius: 22,
    border: "1.3px solid #D2D6DC",
    cursor: "pointer",
    background: isActive ? "#44d7a8" : "transparent",
    color: isActive ? "#FFF" : "#237a53",
    boxShadow: isActive ? "0 2px 8px #44d7a888" : "",
    fontWeight: 600,
    fontSize: 14,
    transition: "all 0.18s",
  }),
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4,
    color: "#374151",
    fontSize: 15,
    fontWeight: 500,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 14,
    fontWeight: 700,
    fontSize: 21,
    color: "#137a4f",
    letterSpacing: "0.03em",
  },
  actionContainer: { display: "flex", gap: 18, marginTop: 10 },
  btnYellow: {
    flex: 1,
    background: "linear-gradient(91deg, #fee96b 65%, #ffe27b 100%)",
    color: "#222d36",
    border: "none",
    fontWeight: 700,
    fontSize: 15,
    boxShadow: "0 2px 8px #f6e05e11",
  },
  btnGreen: {
    flex: 1,
    background: "linear-gradient(91deg, #36de88 65%, #51e2a4 100%)",
    color: "#fff",
    border: "none",
    fontWeight: 700,
    fontSize: 15,
    boxShadow: "0 2px 8px #44d7a811",
  },
};

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const [selectedItems, setSelectedItems] = useState(
    basket.reduce((acc, _, idx) => ({ ...acc, [idx]: true }), {})
  );
  const [address, setAddress] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [donation, setDonation] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  // Responsive selection mapping on basket change
  React.useEffect(() => {
    setSelectedItems((prev) => {
      const newSel = {};
      basket.forEach((_, idx) => {
        newSel[idx] = prev[idx] ?? true;
      });
      return newSel;
    });
  }, [basket]);

  const itemsSelectedCount = Object.keys(selectedItems).filter(idx => selectedItems[idx]).length;

  const removeSelected = () => {
    const toRemove = Object.keys(selectedItems)
      .filter((idx) => selectedItems[idx])
      .map(Number)
      .sort((a, b) => b - a);
    toRemove.forEach((idx) => {
      dispatch({ type: "REMOVE_FROM_BASKET", idx });
    });
    setSelectedItems({});
  };

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
          <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: 1 }}>
            {itemsSelectedCount}/{basket.length} ITEMS SELECTED
          </span>
          <button onClick={removeSelected} style={styles.btnRemove}>
            REMOVE
          </button>
          <button style={styles.btnWishlist}>MOVE TO WISHLIST</button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: "flex",
          gap: 30,
          flexWrap: "wrap",
          minHeight: 400,
          alignItems: "flex-start",
          marginTop: 15,
        }}
      >
        {/* Products List */}
        <div style={styles.productsContainer}>
          <AnimatePresence>
            {basket.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{
                  opacity: 1,
                  scale: hoveredIdx === idx ? 1.018 : 1,
                  y: 0,
                  boxShadow:
                    hoveredIdx === idx
                      ? styles.productCardHover.boxShadow
                      : styles.productCard.boxShadow,
                  borderColor:
                    hoveredIdx === idx
                      ? styles.productCardHover.borderColor
                      : styles.productCard.borderColor,
                }}
                exit={{ opacity: 0, scale: 0.97, y: 30 }}
                transition={{ duration: 0.28, type: "spring", stiffness: 180 }}
                style={{
                  ...styles.productCard,
                  ...(hoveredIdx === idx ? styles.productCardHover : {}),
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(-1)}
              >
                <input
                  type="checkbox"
                  checked={!!selectedItems[idx]}
                  onChange={() =>
                    setSelectedItems((prev) => ({
                      ...prev,
                      [idx]: !prev[idx],
                    }))
                  }
                  style={styles.checkbox}
                />
                <CheckoutProduct
                  {...item}
                  onRemove={() => {
                    dispatch({ type: "REMOVE_FROM_BASKET", id:item.id });
                    setSelectedItems((prev) => {
                      const updated = { ...prev };
                      delete updated[idx];
                      return updated;
                    });
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Coupons */}
          <motion.div
            style={styles.section}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h3 style={styles.sectionTitle}>COUPONS</h3>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Apply Coupons"
                style={styles.input}
              />
              <button
                style={{ ...styles.button, ...styles.btnApply }}
                whileTap={{ scale: 0.94 }}
              >
                APPLY
              </button>
            </div>
          </motion.div>

          {/* Donation */}
          <motion.div
            style={styles.section}
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.23 }}
          >
            <h3 style={styles.sectionTitle}>
              SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
            </h3>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" style={styles.checkbox} />{" "}
              Donate and make a difference
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
          </motion.div>

          {/* Address & Price Details */}
          <motion.div
            style={styles.section}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.31 }}
          >
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
                  fontWeight: 700,
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
                <span>
                  ₹{basket.reduce((sum, i) => sum + Number(i.price || 0), 0)}
                </span>
              </div>
              <div style={styles.summaryRow}>
                <span>Discount on MRP</span>
                <span style={{ color: "#48BB78" }}>
                  -₹{/* insert discount here */}
                </span>
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
                <span>
                  ₹{/* insert total after discounts here */}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            style={styles.actionContainer}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.38 }}
          >
            <button style={{ ...styles.button, ...styles.btnYellow }}>
              Place Standard Order
            </button>
            <button style={{ ...styles.button, ...styles.btnGreen }}>
              Start Group Order
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Address Modal */}
      {showAddressModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.19)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 200,
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.26 }}
            style={{
              background: "#FFF",
              borderRadius: 16,
              padding: 28,
              width: "100%",
              maxWidth: 420,
              boxShadow: "0 10px 40px #3ad7a422",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 16,
                letterSpacing: 1,
                color: "#137a4f",
              }}
            >
              Set Delivery Address
            </h2>
            <textarea
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address..."
              style={{
                width: "100%",
                padding: 10,
                border: "1.7px solid #e1f2e7",
                borderRadius: 8,
                outline: "none",
                fontSize: 16,
                background: "#fafdfb",
                resize: "vertical",
                boxShadow: "0 2px 8px #bdebdc12",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 15, marginTop: 20 }}>
              <button
                onClick={() => setShowAddressModal(false)}
                style={{
                  padding: "9px 14px",
                  borderRadius: 5,
                  background: "#e4f8f1",
                  border: "none",
                  fontWeight: 600,
                  color: "#377",
                  fontSize: 15,
                  marginRight: 5,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddressModal(false)}
                style={{
                  padding: "9px 15px",
                  borderRadius: 5,
                  background: "#44d7a8",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: 0.5,
                }}
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
