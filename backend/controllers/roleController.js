const { validate } = require('../helpers');
const database = require('../database');

const getAllRoles = async (req, res) => {
  const query = `SELECT * FROM roles`;
  try {
    const [rows] = await database.query(query);
    res.status(200).json({ message: "All roles", data: (rows || []), result: true })
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
}

const addRoles = async (req, res) => {
  const { name, description } = req.body;

  const error = validate([
    [name, "name"],
    [description, "description"],
  ]);

  if (!error.isValid) {
    return res.status(400).json({ error: error.message });
  }

  const insertQuery = `
     INSERT INTO roles (name, description) VALUES (?, ?)
  `;

  try {
    const [result] = await database.query(insertQuery, [name, description]);

    if (!result) {
      return res.status(501).json({ message: "Something went wrong", result: false });
    }

    return res.status(200).json({ message: "Role was added successfully", result: true });
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};

const assignPermissionToRole = async (req, res) => {
  const { roleId, permissionId } = req.body;

  const error = validate([
    [roleId, "roleId"],
    [permissionId, "permissionId"],
  ]);

  if (!error.isValid) {
    return res.status(400).json({ error: error.message });
  }

  const insertQuery = `
     INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)
  `;

  try {
    const [result] = await database.query(insertQuery, [roleId, permissionId]);

    if (!result) {
      return res.status(501).json({ message: "Something went wrong", result: false });
    }

    return res.status(200).json({ message: "Assigning Permission To Role was successfully", result: true });
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};

module.exports = { addRoles , getAllRoles, assignPermissionToRole};
