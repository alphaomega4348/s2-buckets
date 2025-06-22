const express = require('express');
const dbconnect = require('./database/mongodb');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

// Routes
const groupRoutes = require('./routes/group');
const login = require('./routes/Login');
const signup = require('./routes/Signup');
const product = require('./routes/ProductManagement');

app.get("/", (req, res) => {
  res.send(`app started at ${PORT}`);
});

app.listen(PORT,(req,res)=>{
    console.log(`app started at ${PORT}`)
})

app.use('/group', groupRoutes);
app.use(login);
app.use(signup);
app.use(product);

dbconnect();

module.exports = app; // ✅ export for server.js