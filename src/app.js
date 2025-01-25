const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// Middleware-uri esențiale
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Import rute
const routes = require("./routes");
app.use("/api", routes);

// Pornirea serverului
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
