const database = require('../database');
const { getUserCart, getUserCartById, calculateCartTotal } = require('./cartController');

const getAllOrders = async (req, res) => {
  const query = `SELECT * FROM orders`;
  try {
    const [rows] = await database.query(query);
    res.status(200).json({ message: "All Orders", data: (rows || []), result: true })
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
}

const getUserOrders = async (req, res) => {
  const { id } = req.params
  const query = `SELECT * FROM orders WHERE customer_id = ?`;
  try {
    const [rows] = await database.query(query, [id]);
    res.status(200).json({ message: "All Orders of User", data: (rows || []), result: true })
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
}

const placeOrder = async (req, res) => {
  const { user_id, payment_method, shipping_address, billing_address } = req.body;

  if (!user_id || !payment_method || !shipping_address || !billing_address) {
    return res.status(400).json({ message: "All fields are required", result: false });
  }

  const orderQuery = `
    INSERT INTO orders (
      customer_id, 
      cart_id, 
      status_id, 
      total_amount, 
      payment_method, 
      shipping_address, 
      billing_address, 
      payment_status
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const userCart = await getUserCartById(user_id);
    const totalAmount = await calculateCartTotal(userCart?.id);
    const status_id = 1;
    const [result] = await database.query(orderQuery, [
      user_id,
      userCart?.id,
      status_id,
      totalAmount,
      payment_method,
      shipping_address,
      billing_address,
      "Paid"
    ]);

    const orderId = result.insertId;

    return res.status(201).json({
      message: "Order placed successfully",
      data: { order_id: orderId },
      result: true
    });

  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};


const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status_id, delivery_date, user_id } = req.body;

  if (!status_id) {
    return res.status(400).json({ message: "Status ID is required", result: false });
  }

  try {
    const timestamp = Date.now();
    const trackingNumber = `TRACK-${user_id}-${timestamp}`;

    const updateQuery = `
      UPDATE orders 
      SET status_id = ?, delivery_date = ?, tracking_number = ?
      WHERE id = ?
    `;

    await database.query(updateQuery, [status_id, new Date(delivery_date), trackingNumber, id]);

    res.status(200).json({ message: "Order updated successfully", result: true });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};

module.exports = { getAllOrders, getUserOrders, placeOrder, updateOrder }