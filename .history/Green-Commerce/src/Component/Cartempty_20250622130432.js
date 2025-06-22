import React from "react";

const styles = {
    emptyWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "65vh",
        width: "100%",
        background: "linear-gradient(120deg, #f8fbf9 70%, #f3f9f4 100%)",
        borderRadius: 18,
        boxShadow: "0 2px 20px #d3ebe93c",
        marginTop: 60,
        padding: 40,
    },
    emptyTitle: {
        fontWeight: 700,
        fontSize: 28,
        color: "#222d36",
        marginBottom: 14,
        letterSpacing: 1,
    },
    emptyDesc: {
        fontSize: 18,
        color: "#6b7280",
        marginBottom: 30,
        maxWidth: 480,
        textAlign: "center",
        lineHeight: 1.5,
    },
    emptyImg: {
        width: 110,
        margin: "18px 0 22px 0",
        opacity: 0.85,
        filter: "drop-shadow(0 2px 6px #d3ebe9b5)",
    },
    shopBtn: {
        padding: "15px 34px",
        border: "1.8px solid #3872fa",
        borderRadius: 10,
        fontWeight: 700,
        color: "#2d3e92",
        background: "#fff",
        fontSize: 21,
        marginTop: 30,
        transition: "background 0.18s, color 0.18s",
        cursor: "pointer",
        boxShadow: "0 2px 12px #2d9be820",
    },
};

function Cartempty() {
    return (
        <div style={styles.emptyWrapper}>
            <div style={styles.emptyTitle}>YOUR WISHLIST IS EMPTY</div>
            <div style={styles.emptyDesc}>
                Add items that you like to your wishlist. Review them anytime and easily move them to the bag.
            </div>
            {/* Placeholder image */}
            <img
                src="/cart-empty-illus.svg"
                alt="empty"
                style={styles.emptyImg}
                onError={e => { e.target.style.display = "none"; }}
            />
            <button
                style={styles.shopBtn}
                onClick={() => (window.location.href = "/green")}
            >
                CONTINUE SHOPPING
            </button>
        </div>
    );
}

export default Cartempty;
