const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const fs=require("fs");

const app = express();
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const {db, auth} = require("./utils/firebase");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const routes = require("./routes");
const authorRoutes = require("./routes/authors");
const bookRoutes = require("./routes/books");

const authRoutes = require("./routes/authRoutes");

app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", routes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

