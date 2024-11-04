const mongoose = require("mongoose");
const dotendv = require("dotenv");

dotendv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB