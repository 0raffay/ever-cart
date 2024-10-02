require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const port = process.env.PORT;

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());

/**
 * Routes
 */

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/brands", require("./routes/brands"));
app.use("/roles", require("./routes/roles"));
app.use("/permissions", require("./routes/permissions"));
app.use("/users", require("./routes/users"));
app.use("/cart", require("./routes/cart"));
app.use("/order-statuses", require("./routes/orderStatus"));
app.use("/orders", require("./routes/orders"));

/**
 * Basic setup
 */

app.use((err, req, res, next) => {
  console.error("Error:", err.message || err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.all("*", (req, res) => {
  res.status(400);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(port, () => {
  console.log(`server is running at port ${port}...
    http://localhost:${port}
    `);
});
