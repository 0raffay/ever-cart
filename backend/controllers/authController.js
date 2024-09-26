const jwt = require('jsonwebtoken');
const { generateToken, validate } = require('../helpers');
const database = require('../database');

async function login(req, res) {
  const { username, password } = req.body;

  // Corrected validation
  const error = validate([
    [username, "username"],
    [password, "password"],  // Corrected
  ]);

  if (!error.isValid) {
    return res.status(400).json({ error: error.message });
  }

  const [users] = await database.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
  if (!users?.length) {
    res.status(400).json({ message: "User not found", data: false });
    return;
  }
  const user = users[0];

  const accessToken = generateToken({ id: user.id, username: user.username }); // Ensure payload is a plain object
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET);

  const query = `INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await database.query(query, [user.id, refreshToken, expiresAt]);

  res.status(200).json({
    message: "Login successful",
    token: accessToken,
    refreshToken
  });
}

async function register(req, res) {
  const { username, email, password } = req.body;

  const error = validate([
    [username, "username"],
    [email, "email"],
    [password, "password"]
  ]);

  if (!error.isValid) {
    return res.status(400).json({ error: error.message });
  }

  const [users] = await database.query("SELECT * FROM users");

  const usernameExists = users.some((user) => {
    return user?.username == username;
  })
  const emailExists = users.some((user) => {
    return user?.email == email;
  })

  if (usernameExists) {
    res.status(401).json({ message: "username already exists", data: false });
    return;
  }
  if (emailExists) {
    res.status(401).json({ message: "email already exists", data: false });
    return;
  }

  const query = `INSERT INTO users (username, email, password)
VALUES (?, ?, ?);
`

  const response = await database.query(query, [username, email, password])

  if (!response) {
    res.status(500).json({ message: 'Something Went Wrong while registering!', data: false });
  }

  res.status(200).json({ message: 'User registered successfully!', data: true });
}

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


async function revokeToken(req, res) {
  const { token } = req.body;

  if (!token) return res.status(401).json({ message: "Token is required" });

  const query = `UPDATE refresh_tokens SET is_revoked = TRUE WHERE token = ?`;
  const result = await database.query(query, [token]);

  if (result.affectedRows === 0) return res.status(404).json({ message: "Token not found" });

  res.status(200).json({ message: "Token revoked successfully" });
}

module.exports = { login, register, refreshToken, revokeToken };
