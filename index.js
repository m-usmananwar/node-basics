const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB();
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));