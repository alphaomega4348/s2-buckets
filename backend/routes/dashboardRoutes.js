const express = require('express');
const router = express.Router();
const Order = require('../storageSchema/Order');
const Product = require('../storageSchema/ProductSchema');

router.get('/user-dashboard', async (req, res) => {
  const email = req.query.email;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    // Step 1: Fetch all orders for the user
    const orders = await Order.find({ userEmail: email });

    if (!orders.length) return res.status(200).json({
      plasticReductionList: [],
      ecoTrend: [],
      categoryStats: [],
      totalCo2Saved: 0,
    });

    let co2Saved = 0;
    const monthlyMap = new Map();
    const categoryMap = {};
    const plasticList = [];

    for (const order of orders) {
      const orderMonth = new Date(order.placedAt).toLocaleString('default', { month: 'short' });

      for (const item of order.items) {
        const product = await Product.findOne({ productId: Number(item.productId) });
        if (!product) continue;

        // --- 1. CO2 Saved ---
        co2Saved += (product.co2ReducedPercent / 100) * item.quantity;

        // --- 2. Monthly Trend ---
        monthlyMap.set(orderMonth, (monthlyMap.get(orderMonth) || 0) + item.quantity);

        // --- 3. Category Stats ---
        const cat = product.category;
        categoryMap[cat] = categoryMap[cat] || { count: 0, total: 0 };
        categoryMap[cat].count += 1;
        categoryMap[cat].total += product.plasticReducedPercent;

        // --- 4. Plastic Reduced List ---
        plasticList.push({
          name: product.productName,
          percentage: product.plasticReducedPercent,
        });
      }
    }

    // Build final outputs
    const ecoTrend = [...monthlyMap.entries()].map(([month, value]) => ({ month, value }));
    const categoryStats = Object.entries(categoryMap).map(([label, obj]) => ({
      label,
      pct: Math.round(obj.total / obj.count),
    }));

    const plasticReductionList = plasticList.slice(0, 10); // latest 10 items or random

    res.json({
      plasticReductionList,
      ecoTrend,
      categoryStats,
      totalCo2Saved: parseFloat(co2Saved.toFixed(1)),
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;