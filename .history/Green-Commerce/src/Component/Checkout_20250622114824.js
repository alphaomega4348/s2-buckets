import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { motion, AnimatePresence } from "framer-motion";

// Gradient, glassy shadows, subtle UI
const styles = {
  container: {
    // maxWidth: 1100,
    width:"90%",
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
    margin:50
  },
  productCard: {
    display: "flex",
    gap: 16,
    padding: "10px",
    background: "rgba(255,255,255,0.97)",
    borderRadius: 18,
    boxShadow: "0 4px 24px #bdebdc29, 0 1.5px 6px #d6f5e9a0",
    alignItems: "flex-start",
    // minWidth: 0,
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
    // minWidth: 320,
    display: "flex",
    flexDirection: "column",
    gap: 26,
    marginTop: 6,
    marginLeft:50
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
    <div>

    </div>
    
  );
}

export default Checkout;
