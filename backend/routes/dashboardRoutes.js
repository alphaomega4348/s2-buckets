const express = require('express');
const router = express.Router();
const Order = require('../storageSchema/Order');
const Product = require('../storageSchema/ProductSchema');

router.get('/user-dashboard', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    // 1) Fetch all orders for the user
    const orders = await Order.find({ userEmail: email });
    const totalOrders = orders.length;

    if (!totalOrders) {
      return res.json({
        plasticReductionList: [],
        ecoTrend: [],
        categoryStats: [],
        totalCo2Saved: 0,
        totalOrders: 0,
        totalProductsOrdered: 0,
      });
    }

    let co2Saved = 0;
    let totalProductsOrdered = 0;
    const monthlyMap = new Map();
    const categoryMap = {};
    const plasticList = [];

    for (const order of orders) {
      const orderMonth = new Date(order.placedAt)
        .toLocaleString('default', { month: 'short' });

      for (const item of order.items) {
        // count products
        totalProductsOrdered += item.quantity;

        const product = await Product.findOne({ productId: Number(item.productId) });
        if (!product) continue;

        // a) accumulate CO₂ saved
        co2Saved += (product.co2ReducedPercent / 100) * item.quantity;

        // b) monthly trend (sum quantities per month)
        monthlyMap.set(
          orderMonth,
          (monthlyMap.get(orderMonth) || 0) + item.quantity
        );

        // c) category stats (avg plastic reduced %)
        const cat = product.category;
        if (!categoryMap[cat]) categoryMap[cat] = { count: 0, total: 0 };
        categoryMap[cat].count += 1;
        categoryMap[cat].total += product.plasticReducedPercent;

        // d) plastic reduced list
        plasticList.push({
          name: product.productName,
          percentage: product.plasticReducedPercent,
        });
      }
    }

    // Build output arrays
    const ecoTrend = [...monthlyMap.entries()]
      .map(([month, value]) => ({ month, value }));
    const categoryStats = Object.entries(categoryMap)
      .map(([label, { count, total }]) => ({
        label,
        pct: Math.round(total / count),
      }));
    const plasticReductionList = plasticList.slice(0, 10); // top 10 or latest

    res.json({
      plasticReductionList,
      ecoTrend,
      categoryStats,
      totalCo2Saved: parseFloat(co2Saved.toFixed(1)),
      totalOrders,
      totalProductsOrdered
    });
  } catch (err) {
    console.error('Dashboard fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;