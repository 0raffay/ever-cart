const database = require('../database');

const getAllOrderStatus = async (req, res) => {
  const query = `SELECT * FROM order_status`;
  try {
    const [rows] = await database.query(query);
    res.status(200).json({ message: "All Order Statuses", data: (rows || []), result: true })
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
}

module.exports = {getAllOrderStatus}