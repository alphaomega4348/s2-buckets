import React, { useState, useRef } from "react";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { motion, AnimatePresence } from "framer-motion";

// ...styles as you have it, unchanged...
v
function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const [selectedItems, setSelectedItems] = useState(
    basket.reduce((acc, _, idx) => ({ ...acc, [idx]: true }), {})
  );
  const [savedAddress, setSavedAddress] = useState(""); // NEW
  const [address, setAddress] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [donation, setDonation] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const [homeNo, setHomeNo] = useState("");
  const [pincode, setPincode] = useState("");
  const [totalpayment, SettotalPayment] = useState();
  const [blinkCoupon, setBlinkCoupon] = useState(false);

  const couponSectionRef = useRef(null);
  const couponInputRef = useRef(null);

  React.useEffect(() => {
    setSelectedItems((prev) => {
      const newSel = {};
      basket.forEach((_, idx) => {
        newSel[idx] = prev[idx] ?? true;
      });
      return newSel;
    });
  }, [basket]);

  // Calculate discount and coupon discount
  const totalMRP = basket.reduce((sum, i) => sum + Number(i.price || 0), 0);
  // If your items have individual discountPercent, update this line
  const totalDiscount = basket.reduce(
    (sum, item) =>
      sum +
      ((Number(item.price) || 0) *
        (Number(item.discountPercent) || 0)) /
      100,
    0
  );

  const itemTotalAfterDiscount = totalMRP - totalDiscount;

  // Coupon logic: 5% off after MRP discount
  const couponDiscount = couponApplied ? Math.round(itemTotalAfterDiscount * 0.05) : 0;

  // Total payment after discounts
  React.useEffect(() => {
    SettotalPayment(itemTotalAfterDiscount - couponDiscount);
  }, [itemTotalAfterDiscount, couponDiscount, basket]);

  const itemsSelectedCount = Object.keys(selectedItems).filter(
    (idx) => selectedItems[idx]
  ).length;

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

  // ---- COUPON HANDLER -----
  const handleApplyCoupon = () => {
    setBlinkCoupon(true);

    // After blink, apply coupon, scroll, and reset blink
    setTimeout(() => {
      setBlinkCoupon(false);
      setCouponApplied(true);
      if (couponSectionRef.current) {
        couponSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      if (couponInputRef.current) {
        couponInputRef.current.focus();
      }
    }, 400); // blink time
  };

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #f8fbf9 70%, #f3f9f4 100%)",
      }}
    >
      <div style={styles.container}>
        {/* Selection Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <input
              type="checkbox"
              checked={
                itemsSelectedCount === basket.length && basket.length !== 0
              }
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
                      dispatch({
                        type: "REMOVE_FROM_BASKET",
                        id: item.id,
                      });
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
              ref={couponSectionRef}
              style={styles.section}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h3 style={styles.sectionTitle}>COUPONS</h3>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  ref={couponInputRef}
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Apply Coupons"
                  style={{
                    ...styles.input,
                    boxShadow: blinkCoupon
                      ? "0 0 0 3px #ff60a6"
                      : styles.input.boxShadow,
                    border:
                      blinkCoupon && !couponApplied
                        ? "2px solid #ED64A6"
                        : styles.input.border,
                    transition: "box-shadow 0.2s, border 0.2s",
                  }}
                  disabled={couponApplied}
                />
                <button
                  style={{
                    ...styles.button,
                    ...styles.btnApply,
                    background: couponApplied ? "#44d7a8" : "#ED64A6",
                  }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                >
                  {couponApplied ? "Coupon Applied" : "APPLY"}
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
            </motion.div>

            {/* Address & Price Details */}
            <motion.div
              style={styles.section}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.31 }}
            >
              <h3 style={styles.sectionTitle}>Delivery Address</h3>
              {savedAddress ? (
                <p>{savedAddress}</p>
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
                  <span>₹{totalMRP}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Discount on MRP</span>
                  <span style={{ color: "#48BB78" }}>
                    -₹{totalDiscount}
                  </span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Coupon Discount</span>
                  <span style={{ color: "#ff60a6", fontWeight: 600 }}>
                    {couponApplied
                      ? `-₹${couponDiscount} (5% Off)`
                      : <span style={{ color: "#888" }}>Apply Coupon</span>}
                  </span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Platform Fee</span>
                  <span style={{ color: "#48BB78" }}>FREE</span>
                </div>
                <div style={styles.totalRow}>
                  <span>Total Amount</span>
                  <span>
                    ₹{typeof totalpayment === "number" ? totalpayment : itemTotalAfterDiscount}
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
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 8,
                  letterSpacing: 1,
                  color: "#137a4f",
                }}
              >
                Set Delivery Address
              </h2>
              <input
                type="text"
                value={homeNo}
                onChange={e => setHomeNo(e.target.value)}
                placeholder="Flat / House / Building No."
                style={{
                  width: "100%",
                  padding: 9,
                  border: "1.7px solid #e1f2e7",
                  borderRadius: 8,
                  outline: "none",
                  fontSize: 16,
                  background: "#fafdfb",
                  marginBottom: 8,
                }}
              />
              <input
                type="text"
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="Pincode"
                style={{
                  width: "100%",
                  padding: 9,
                  border: "1.7px solid #e1f2e7",
                  borderRadius: 8,
                  outline: "none",
                  fontSize: 16,
                  background: "#fafdfb",
                  marginBottom: 8,
                }}
              />
              <textarea
                rows={4}
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Street, Area, Landmark, City"
                style={{
                  width: "100%",
                  padding: 9,
                  border: "1.7px solid #e1f2e7",
                  borderRadius: 8,
                  outline: "none",
                  fontSize: 16,
                  background: "#fafdfb",
                  resize: "vertical",
                  marginBottom: 8,
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 15,
                  marginTop: 6,
                }}
              >
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
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const parts = [homeNo, pincode, address].filter(Boolean);
                    setSavedAddress(parts.join(", "));
                    setShowAddressModal(false);
                  }}
                  style={{
                    padding: "9px 15px",
                    borderRadius: 5,
                    background: "#44d7a8",
                    color: "#fff",
                    border: "none",
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: 0.5,
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
