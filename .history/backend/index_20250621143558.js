const express=require('express');
const dbconnect = require('./database/mongodb');
const cors = require('cors');
const path=require('path')
const app=express();
app.use(express.json());
app.use(cors());

// 1) expose the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
require('dotenv').config();
const PORT=process.env.PORT;

app.listen(PORT,(req,res)=>{
    console.log(`app started at ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send(`app started at ${PORT}`);
})


const login =require("./routes/Login.js");
const Signup=require("./routes/Signup.js");
const addproduct=require("./routes/ProductManagement.js");
app.use(login);
app.use(Signup);
app.use(addproduct);

dbconnect();



