import React, { useState } from "react";
import { motion } from "framer-motion";
import EcoWheel from "./EcoWheel";

export default function SellerSection() {
  // → Animation variants
  const btnVariants = {
    rest: {},
    hover: { scale: 1.05, boxShadow: "0 8px 24px rgba(46,125,50,0.3)" },
    tap: { scale: 0.95 },
  };

  // → Form state
  const [formData, setFormData] = useState({
    productId: "", productName: "", category: "", price: "", grade: "",
    filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: false },
    productImage: null, manufacturingProcess: "", transportationMethod: "", materialsUsed: "",
    plasticReducedPercent: "", chemicalUsedPercent: "", co2ReducedPercent: "",
    isRecyclable: "", packagingRecyclable: "", biodegradablePercent: "",
    waterUsedLiters: "", energyUsedKwh: "", productWeightKg: "", productLifespanYears: "",
  });
  const [hovered, setHovered] = useState("");
  const [modalGrade, setModalGrade] = useState(null);
  const [toast, setToast] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  let toastTimer = null;

  // → Toast helper
  const showToast = (message, type = "success") => {
    clearTimeout(toastTimer);
    setToast({ message, type });
    setToastVisible(true);
    toastTimer = setTimeout(() => setToastVisible(false), 3000);
  };

  // → Field change handler
  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    if (name.startsWith("filters.")) {
      const key = name.split(".")[1];
      setFormData(p => ({ ...p, filters: { ...p.filters, [key]: checked } }));
    } else if (type === "file") {
      setFormData(p => ({ ...p, [name]: files[0] }));
    } else {
      setFormData(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    }
  };

  // → Grade calculation
  const calculateGrade = async (e) => {
    e.preventDefault();
    const payload = {
      plastic_reduced_percent: +formData.plasticReducedPercent,
      chemical_used_percent: +formData.chemicalUsedPercent,
      co2_emission_reduced_percent: +formData.co2ReducedPercent,
      is_recyclable: +formData.isRecyclable,
      biodegradable_percent: +formData.biodegradablePercent,
      packaging_recyclable: +formData.packagingRecyclable,
      water_used_liters: +formData.waterUsedLiters,
      energy_used_kwh: +formData.energyUsedKwh,
      product_weight_kg: +formData.productWeightKg,
      product_lifespan_years: +formData.productLifespanYears,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).detail || "Prediction failed");
      const { predicted_grade } = await res.json();
      setModalGrade(predicted_grade);
      setFormData(f => ({ ...f, grade: predicted_grade }));
      showToast(`Eco grade: ${predicted_grade}`, "success");
    } catch {
      showToast("Could not calculate grade", "error");
    }
  };

  // → Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let [k, v] of Object.entries(formData)) {
      if (k === "filters") continue;
      if (v === "" || v == null) return showToast(`Please fill in ${k}`, "error");
    }

    const payload = new FormData();
    [
      "productId", "productName", "category", "price", "grade",
      "manufacturingProcess", "transportationMethod", "materialsUsed",
      "plasticReducedPercent", "chemicalUsedPercent", "co2ReducedPercent",
      "isRecyclable", "packagingRecyclable", "biodegradablePercent",
      "waterUsedLiters", "energyUsedKwh", "productWeightKg", "productLifespanYears"
    ].forEach(f => payload.append(f, formData[f]));
    Object.entries(formData.filters).forEach(([k, v]) => payload.append(`filters.${k}`, v));
    payload.append("productImage", formData.productImage);
    if (modalGrade) payload.append("grade", modalGrade);

    try {
      const res = await fetch("http://127.0.0.1:8080/addproduct", {
        method: "POST", body: payload
      });
      if (!res.ok) throw new Error((await res.json()).error || "Server error");
      await res.json();
      showToast("Product created!", "success");
      // reset
      setFormData({
        productId: "", productName: "", category: "", price: "", grade: "",
        filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: false },
        productImage: null, manufacturingProcess: "", transportationMethod: "", materialsUsed: "",
        plasticReducedPercent: "", chemicalUsedPercent: "", co2ReducedPercent: "",
        isRecyclable: "", packagingRecyclable: "", biodegradablePercent: "",
        waterUsedLiters: "", energyUsedKwh: "", productWeightKg: "", productLifespanYears: "",
      });
    } catch {
      showToast("Failed to create product", "error");
    }
  };

  // ---- STYLES ----
  const container = {
    maxWidth: "960px",
    margin: "40px auto",
    fontFamily: "'Montserrat', sans-serif",
    background: "linear-gradient(135deg, #eafaf4 0%, #f5fbf9 100%)",
    padding: "32px",
    borderRadius: "12px",
  };
  const navStyle = { marginBottom: "32px", textAlign: "center" };
  const sidebar = {
    display: "inline-flex",
    gap: "32px",
    listStyle: "none",
    padding: 0,
    margin: 0,
  };
  const link = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    color: "#01332B",
    textDecoration: "none",
  };
  const heading = {
    fontSize: "2.4rem",
    fontWeight: 700,
    color: "#01332b",
    textAlign: "center",
    marginBottom: "32px",
  };
  const sectionTitle = {
    fontSize: 20,
    margin: "0 0 16px 0",
    borderLeft: "4px solid #01332b",
    paddingLeft: 8,
    color: "#33691E",
  };
  const labelStyle = {
    display: "inline-block",
    marginBottom: "8px",
    marginTop: "12px",
    fontSize: "0.875rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    background: "linear-gradient(90deg, #81c784, #388e3c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "2px solid #C8E6C9",
    backgroundColor: "#F5FDFA",
    fontSize: "1rem",
    fontWeight: 500,
    color: "#01332B",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };
  const buttonStyle = {
    display: "block",
    margin: "24px auto 0",
    padding: "14px 28px",
    background: "linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "24px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(46,125,50,0.2)",
    transition: "background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease",
  };
  const cardStyle = key => ({
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "24px",
    borderLeft: "6px solid #66bb6a",
    boxShadow: hovered === key
      ? "0 12px 24px rgba(46,125,50,0.2)"
      : "0 4px 12px rgba(0,0,0,0.08)",
    transform: hovered === key ? "translateY(-6px)" : "translateY(0)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  });
  const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };
  const modalBackdrop = {
    position: "fixed", top: 0, left: 0,
    width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  };
  const modalBox = {
    background: "#fff", padding: 24, borderRadius: 8,
    textAlign: "center", minWidth: 280,
  };
  const toastStyle = {
    position: "fixed", left: "50%", transform: "translateX(-50%)",
    top: toastVisible ? 16 : -80,
    transition: "top 0.4s ease",
    background: "#fff", padding: "12px 20px",
    borderRadius: 4, boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex", alignItems: "center", zIndex: 10000,
    minWidth: 280,
  };

  return (
    <div style={container}>
      {/* Top Navbar */}
      <nav style={navStyle}>
        <ul style={sidebar}>
          <li><a href="/home" style={link}>Home</a></li>
          <li><a href="/education" style={link}>Educational Section</a></li>
          <li><a href="/report" style={link}>Sustainability Report</a></li>
        </ul>
      </nav>

      {/* Heading */}
      <h1 style={heading}>List Your Eco-Friendly Product</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>

        {/* Basic Info */}
        <section
          onMouseEnter={() => setHovered("basic")}
          onMouseLeave={() => setHovered("")}
          style={cardStyle("basic")}
        >
          <h2 style={sectionTitle}>Basic Product Info</h2>
          <div style={grid2}>
            {/* … all your inputs, labels, etc. … */}
          </div>
        </section>

        {/* Manufacturing Details */}
        <section
          onMouseEnter={() => setHovered("manu")}
          onMouseLeave={() => setHovered("")}
          style={cardStyle("manu")}
        >
          <h2 style={sectionTitle}>Manufacturing Details</h2>
          <div style={grid2}>
            {/* … */}
          </div>
        </section>

        {/* Eco Specs */}
        <section
          onMouseEnter={() => setHovered("eco")}
          onMouseLeave={() => setHovered("")}
          style={cardStyle("eco")}
        >
          <h2 style={sectionTitle}>Eco Specifications</h2>
          <div style={grid2}>
            {/* … */}
          </div>
          <div style={{ textAlign: "right", marginTop: 8 }}>
            <button
              type="button"
              onClick={calculateGrade}
              style={{ ...buttonStyle, background: "#ffa000" }}
            >
              Calculate Eco Grade
            </button>
          </div>
        </section>

        {/* Submit Button */}
        <motion.button
          type="submit"
          style={buttonStyle}
          variants={btnVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          Submit Product
        </motion.button>
      </form>

      {/* Modal */}
      {modalGrade && (
        <div style={modalBackdrop}>
          <div style={modalBox}>
            <button
              onClick={() => setModalGrade(null)}
              style={{
                position: "absolute", top: 12, right: 12,
                background: "none", border: "none",
                fontSize: 20, cursor: "pointer", color: "#999",
              }}
            >
              ×
            </button>
            <h3 style={{ margin: "0 0 16px", fontSize: 22, color: "#2e7d32" }}>
              Your Eco Rating
            </h3>
            <div style={{ margin: "0 auto", width: 200, height: 200 }}>
              <EcoWheel grade={modalGrade} />
            </div>
            <button
              onClick={() => setModalGrade(null)}
              style={{
                display: "block", width: "100%", padding: "12px 0",
                marginTop: 24, background: "#2e7d32", color: "#fff",
                border: "none", borderRadius: 6, fontSize: 16, cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={toastStyle}>
          <span
            style={{
              display: "inline-flex", alignItems: "center",
              justifyContent: "center", width: 20, height: 20,
              borderRadius: "50%", background: toast.type === "success" ? "#4caf50" : "#f44336",
              color: "#fff", marginRight: 12, fontSize: 14,
            }}
          >
            {toast.type === "success" ? "✔️" : "❌"}
          </span>
          <span style={{ color: "#333", fontSize: 14 }}>{toast.message}</span>
          <button
            onClick={() => setToastVisible(false)}
            style={{
              marginLeft: "auto", border: "none", background: "transparent",
              fontSize: 16, cursor: "pointer", color: "#999",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
