const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API! If you can read this, it means your request didn’t get lost in the void! 🚀");
});

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));