const mongoose = require('mongoose');

require("dotenv").config();
const url = process.env.mongo_uri;

const dbconnect = async () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("conneted to Mongo db");
        })
        .catch((error) => {
            console.log("error is mongo db connection ", error);
        })
}

module.exports = dbconnect;
