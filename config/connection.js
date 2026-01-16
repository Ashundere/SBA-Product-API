const mongoose = require("mongoose");
require("dotenv").config();

uri = process.env.MONGO_URI;


const connectMongoDB = async () =>{
try {
    const connect = mongoose.connect(uri)
    console.log("Successfully connected to MongoDB!")
} catch (error) {
    console.error("Connection error", error)
    process.exit(1)
}
}

module.exports = connectMongoDB