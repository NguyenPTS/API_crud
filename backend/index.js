require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB, sequelize } = require("./config/db");
const Item = require("./models/itemModel");

const app = express();
const swaggerDocs = require("./config/swagger");
swaggerDocs(app);
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Database
connectDB();

// Sync Database
sequelize.sync({ force: false }) // Change to `true` to reset tables
    .then(() => console.log("Database synced"))
    .catch(err => console.error("Sync error:", err));

// Routes
app.use("/api/items", require("./routes/itemRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
