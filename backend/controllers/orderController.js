const database = require("../database");
const {
  getUserCart,
  getUserCartById,
  calculateCartTotal,
} = require("./cartController");

const getAllOrders = async (req, res) => {
  const query = `SELECT * FROM orders`;
  try {
    const [rows] = await database.query(query);
    res
      .status(200)
      .json({ message: "All Orders", data: rows || [], result: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database error", error: error.message, result: false });
  }
};

const getUserOrders = async (req, res) => {
  const { id } = req.params;

  const orderQuery = `
    SELECT 
      o.id AS order_id,
      o.customer_id,
      o.cart_id,
      o.order_date,
      o.status_id,
      o.total_amount,
      o.payment_method,
      o.shipping_address,
      o.billing_address,
      o.payment_status,
      o.shipping_date,
      o.delivery_date,
      o.tracking_number,
      c.id AS cart_id,
      c.user_id AS cart_user_id,
      c.is_active,
      c.created_at AS cart_created_at,
      c.updated_at AS cart_updated_at
    FROM orders o
    LEFT JOIN carts c ON o.cart_id = c.id
    WHERE o.customer_id = ?
  `;

  const productQuery = `
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      p.price AS product_price,
      pi.image_url AS product_image_url,
      ci.quantity AS user_quantity  -- Get the quantity the user added
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    JOIN product_images pi ON p.id = pi.product_id
    WHERE ci.cart_id = ?
  `;

  try {
    // Fetch the orders by customer_id
    const [orders] = await database.query(orderQuery, [id]);

    const productIds = await Promise.all(
      orders?.map(async (item) => await getCart(item?.cart_id))
    );

    console.log("product ids", productIds)

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user", result: false });
    }

    // Fetch products for each order's cart_id
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const [products] = await database.query(productQuery, [order.cart_id]);
        return { ...order, ...new Set(products) }; // Combine order and products data
      })
    );

    res.status(200).json({
      message: "All Orders of User",
      data: ordersWithProducts,
      result: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database error", error: error.message, result: false });
  }
};

const getCart = async (cartId) => {
  const query = "SELECT * FROM cart_items WHERE cart_id = ?";
  try {
    const [items] = await database.query(query, [cartId]);
    console.log("items", items);
  } catch (error) {
    console.error("error", error);
  }
};

const placeOrder = async (req, res) => {
  const { user_id, payment_method, shipping_address, billing_address } =
    req.body;

  if (!user_id || !payment_method || !shipping_address || !billing_address) {
    return res
      .status(400)
      .json({ message: "All fields are required", result: false });
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
      "Paid",
    ]);

    const orderId = result.insertId;

    return res.status(201).json({
      message: "Order placed successfully",
      data: { order_id: orderId },
      result: true,
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ message: "Database error", error: error.message, result: false });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status_id, delivery_date, user_id } = req.body;

  if (!status_id) {
    return res
      .status(400)
      .json({ message: "Status ID is required", result: false });
  }

  try {
    const timestamp = Date.now();
    const trackingNumber = `TRACK-${user_id}-${timestamp}`;

    const updateQuery = `
      UPDATE orders 
      SET status_id = ?, delivery_date = ?, tracking_number = ?
      WHERE id = ?
    `;

    await database.query(updateQuery, [
      status_id,
      new Date(delivery_date),
      trackingNumber,
      id,
    ]);

    res
      .status(200)
      .json({ message: "Order updated successfully", result: true });
  } catch (error) {
    console.error("Error updating order:", error);
    return res
      .status(500)
      .json({ message: "Database error", error: error.message, result: false });
  }
};

module.exports = { getAllOrders, getUserOrders, placeOrder, updateOrder };
