import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import logo from "../assets/logo.png";

const StandardHeader = () => {
    const [{ basket }, dispatch] = useStateValue();

    // you’d probably pull these from context / props in a real app
    const userName = "Vishal";
    const pincode = "831014";

    // pick the right target based on presence of a token
    const accountTarget = localStorage.getItem("jwtToken")
        ? "/dashboard"
        : "/login";

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "black",
                padding: "0 16px",
                height: 60,
                color: "white"
            }}
        >
            {/* Logo + deliver-to */}
            <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                <img
                    src={logo}
                    alt="amazon.in"
                    style={{
                        width: 170,
                        objectFit: "contain",
                        marginLeft: -25
                    }}
                />
            </Link>

            <div style={{ display: "flex", flexDirection: "column", color: "white", lineHeight: 1.2, alignItems: "center", marginLeft: 16 }}>
                {/* Top line */}
                <div style={{ fontSize: 12, color: "#ccc", marginBottom: 2 }}>
                    Deliver to {userName}
                </div>
                {/* Bottom line with pin */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="white"
                        style={{ marginRight: 4 }}
                    >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                    <span style={{ fontSize: 13, fontWeight: "bold" }}>
                        {pincode}
                    </span>
                </div>
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Category selector + search */}
            <div
                style={{
                    display: "flex",
                    flex: 2,
                    height: 40,
                    borderRadius: 4,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                    marginRight: 25
                }}
            >
                <select
                    style={{
                        border: "none",
                        backgroundColor: "#f3f3f3",
                        padding: "0 12px",
                        fontSize: 12,
                        color: "#111",
                        outline: "none",
                        cursor: "pointer",
                        width: "20%"
                    }}
                >
                    <option value="all">All Categories</option>
                    <option value="green">Sustainable Products</option>
                    {/* …other options */}
                </select>
                <input
                    type="text"
                    placeholder="Search Amazon.in"
                    style={{
                        flex: 1,
                        border: "none",
                        padding: "0 12px",
                        fontSize: 14,
                        outline: "none",
                        color: "#111"
                    }}
                />
                <button
                    style={{
                        width: 44,
                        border: "none",
                        backgroundColor: "#febd69",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    🔍
                </button>
            </div>

            {/* Language selector */}
            <div style={{ display: "flex", alignItems: "center", marginRight: 20, cursor: "pointer" }}>
                <span style={{ fontSize: 12, color: "white", marginRight: 5 }}>EN</span>
            </div>

            {/* Account & Lists */}
            <Link
                to={accountTarget}
                style={{ textDecoration: "none", color: "white", marginRight: 20 }}
            >
                <div style={{ fontSize: 13, cursor: "pointer" }}>
                    <div>Hello, {userName}</div>
                    <div style={{ fontWeight: "bold" }}>Account & Lists ▾</div>
                </div>
            </Link>

            {/* Returns & Orders */}
            <Link to="/orders" style={{ textDecoration: "none", color: "white", marginRight: 20 }}>
                <div style={{ fontSize: 13, textAlign: 'center' }}>
                    <div>Returns</div>
                    <div style={{ fontWeight: "bold" }}>& Orders</div>
                </div>
            </Link>

            {/* Cart */}
            <Link to="/checkout" style={{ textDecoration: "none", color: "white", display: "flex", alignItems: "center" }}>
                <img
                    src="/images/cart_icon.png"
                    alt="Cart"
                    style={{ width: 40, marginRight: 4 }}
                />
                <span style={{ fontWeight: "bold" }}>{basket?.length || 0}</span>
            </Link>
        </div>
    );
};

export default NormalHeader;
