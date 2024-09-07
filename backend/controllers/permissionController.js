const { validate } = require('../helpers');
const database = require('../database');

const getAllPermissions = async (req, res) => {
  const query = `SELECT * FROM permissions`;
  try {
    const [rows] = await database.query(query);
    res.status(200).json({ message: "All permissions", data: (rows || []), result: true })
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
}

const addPermission = async (req, res) => {
  const { name, description } = req.body;

  const error = validate([
    [name, "name"],
    [description, "description"],
  ]);

  if (!error.isValid) {
    return res.status(400).json({ error: error.message });
  }

  const insertQuery = `
     INSERT INTO permissions (name, description) VALUES (?, ?)
  `;

  try {
    const [result] = await database.query(insertQuery, [name, description]);

    if (!result) {
      return res.status(501).json({ message: "Something went wrong", result: false });
    }

    return res.status(200).json({ message: "Permission was added successfully", result: true });
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};

module.exports = { addPermission , getAllPermissions};
