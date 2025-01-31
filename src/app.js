const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const routes = require("./routes");
const authorRoutes = require("./routes/authors");
const bookRoutes = require("./routes/books");

// app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", routes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

