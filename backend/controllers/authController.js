const jwt = require('jsonwebtoken');
const { generateToken, validate } = require('../helpers');
const database = require('../database');

// Login function
async function login(req, res) {
  const { username, password } = req.body;

  // Validation
  const error = validate([
    [username, "username"],
    [password, "password"],
  ]);

  if (!error.isValid) {
    return res.status(400).json({ error: error.message });
  }

  // Query user from the database
  const [users] = await database.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
  if (!users?.length) {
    return res.status(400).json({ message: "User not found", data: false });
  }
  const user = users[0];

  // Generate access and refresh tokens
  const accessToken = generateToken({ id: user.id, username: user.username });
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET);

  // Insert refresh token into the database
  const query = `INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry for the refresh token
  await database.query(query, [user.id, refreshToken, expiresAt]);

  // Return response with user ID
  res.status(200).json({
    message: "Login successful",
    userId: user.id,
    token: accessToken,
    refreshToken
  });
}

// Register function
async function register(req, res) {
  const { username, email, password } = req.body;

  // Validation
  const error = validate([
    [username, "username"],
    [email, "email"],
    [password, "password"]
  ]);

  if (!error.isValid) {
    return res.status(400).json({ error: error.message });
  }

  // Check if username or email already exists
  const [users] = await database.query("SELECT * FROM users");
  const usernameExists = users.some((user) => user?.username == username);
  const emailExists = users.some((user) => user?.email == email);

  if (usernameExists) {
    return res.status(401).json({ message: "Username already exists", data: false });
  }
  if (emailExists) {
    return res.status(401).json({ message: "Email already exists", data: false });
  }

  // Insert new user into the database
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  const [response] = await database.query(query, [username, email, password]);

  if (!response) {
    return res.status(500).json({ message: 'Something went wrong while registering!', data: false });
  }

  const userId = response.insertId;

  // Create a cart for the new user
  const cartQuery = `INSERT INTO carts (user_id, created_at, updated_at) VALUES (?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
  await database.query(cartQuery, [userId]);

  // Generate tokens
  const accessToken = generateToken({ id: userId, username });
  const refreshToken = jwt.sign({ id: userId, username }, process.env.REFRESH_TOKEN_SECRET);

  // Insert refresh token into the database
  const refreshTokenQuery = `INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry for the refresh token
  await database.query(refreshTokenQuery, [userId, refreshToken, expiresAt]);

  // Return response with user ID
  res.status(200).json({
    message: 'User registered successfully!',
    userId: userId,
    token: accessToken,
    refreshToken
  });
}

// Refresh Token function
async function refreshToken(req, res) {
  const { token } = req.body;

  if (!token) return res.status(401).json({ message: "Refresh token is required" });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const query = `SELECT * FROM refresh_tokens WHERE token = ? AND is_revoked = FALSE AND expires_at > NOW()`;
    const [rows] = await database.query(query, [token]);

    if (rows.length === 0) return res.status(403).json({ message: "Refresh token not found or expired" });

    const accessToken = generateToken({ name: user.name });

    res.json({ accessToken });
  });
}

// Revoke Token function
async function revokeToken(req, res) {
  const { token } = req.body;

  if (!token) return res.status(401).json({ message: "Token is required" });

  const query = `UPDATE refresh_tokens SET is_revoked = TRUE WHERE token = ?`;
  const result = await database.query(query, [token]);

  if (result.affectedRows === 0) return res.status(404).json({ message: "Token not found" });

  res.status(200).json({ message: "Token revoked successfully" });
}

module.exports = { login, register, refreshToken, revokeToken };
