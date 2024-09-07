const { validate } = require('../helpers');
const database = require('../database');

const getAllUsers = async (req, res) => {
  const query = `SELECT * FROM users`;
  try {
    const [rows] = await database.query(query);
    res.status(200).json({ message: "All users", data: (rows || []), result: true })
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
}

const assignRoleToUser = async (req, res) => {
  const { roleId, userId } = req.body;

  const error = validate([
    [userId, "userId"],
    [roleId, "roleId"],
  ]);

  if (!error.isValid) {
    return res.status(400).json({ error: error.message });
  }

  const insertQuery = `
     INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)
  `;

  try {
    const [result] = await database.query(insertQuery, [roleId, userId]);

    if (!result) {
      return res.status(501).json({ message: "Something went wrong", result: false });
    }

    return res.status(200).json({ message: "Assigning Role To user was successfully", result: true });
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};


module.exports = { assignRoleToUser, getAllUsers };
