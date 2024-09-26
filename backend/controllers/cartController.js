const { validate } = require('../helpers');
const database = require('../database');


const getUserCart = async (req, res) => {
  const { user_id } = req.params;

  try {
    const checkCartQuery = `SELECT id FROM carts WHERE user_id = ?`;
    const [[cart]] = await database.query(checkCartQuery, [user_id]);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user", result: false });
    }

    const getCartItemsQuery = `
      SELECT ci.product_id, ci.quantity, ci.added_at, p.name, p.price, p.description
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
    `;

    const [cartItems] = await database.query(getCartItemsQuery, [cart.id]);

    if (cartItems.length === 0) {
      return res.status(200).json({ message: "Your cart is empty", data: [], result: true });
    }

    res.status(200).json({
      message: "User's cart", data: cartItems, result: true, cart_total: cartItems?.reduce((total, item) => {
        return total + item?.quantity * item?.price;
      }, 0)
    });

  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};

const addOrUpdateCartItem = async (cart_id, product_id, quantity) => {
  const checkCartItemQuery = `SELECT quantity FROM cart_items WHERE cart_id = ? AND product_id = ?`;
  const updateCartItemQuery = `UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?`;
  const insertCartItemQuery = `INSERT INTO cart_items (cart_id, product_id, quantity, added_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`;

  const [[existingCartItem]] = await database.query(checkCartItemQuery, [cart_id, product_id]);

  if (existingCartItem) {
    const newQuantity = existingCartItem.quantity + quantity;
    const [updateResult] = await database.query(updateCartItemQuery, [newQuantity, cart_id, product_id]);
    return updateResult.affectedRows > 0 ? "updated" : null;
  } else {
    const [insertResult] = await database.query(insertCartItemQuery, [cart_id, product_id, quantity]);
    return insertResult.affectedRows > 0 ? "inserted" : null;
  }
};

const addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    const checkCartQuery = `SELECT id FROM carts WHERE user_id = ?`;
    const insertCartQuery = `INSERT INTO carts (user_id, created_at) VALUES (?, CURRENT_TIMESTAMP)`;

    let [[cart]] = await database.query(checkCartQuery, [user_id]);

    if (!cart) {
      const [cartResult] = await database.query(insertCartQuery, [user_id]);
      cart = { id: cartResult.insertId }; // Use the inserted cart's ID
    }

    const action = await addOrUpdateCartItem(cart.id, product_id, quantity);

    if (action === "inserted") {
      res.status(200).json({ message: "Product has been added to cart", result: true });
    } else if (action === "updated") {
      res.status(200).json({ message: "Product quantity updated in the cart", result: true });
    } else {
      res.status(400).json({ message: "Something went wrong", result: false });
    }

  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};

const updateCartItem = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    const checkCartQuery = `SELECT id FROM carts WHERE user_id = ?`;
    const [[cart]] = await database.query(checkCartQuery, [user_id]);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found", result: false });
    }

    const action = await addOrUpdateCartItem(cart.id, product_id, quantity);

    if (action === "updated") {
      res.status(200).json({ message: "Product quantity updated in the cart", result: true });
    } else {
      res.status(400).json({ message: "Failed to update cart item", result: false });
    }

  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};

const deleteProductFromCart = async (req, res) => {
  const { product_id, user_id } = req.body;

  try {
    const checkCartQuery = `SELECT id FROM carts WHERE user_id = ?`;
    const [[cart]] = await database.query(checkCartQuery, [user_id]);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user", result: false });
    }

    const deleteProductQuery = `DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?`;
    const [result] = await database.query(deleteProductQuery, [cart.id, product_id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Product removed from cart", result: true });
    } else {
      res.status(404).json({ message: "Product not found in cart", result: false });
    }

  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};

const removeAllItemsFromCart = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Check if the user has a cart
    const checkCartQuery = `SELECT id FROM carts WHERE user_id = ?`;
    const [[cart]] = await database.query(checkCartQuery, [user_id]);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user", result: false });
    }

    // Delete all items from the cart
    const deleteAllItemsQuery = `DELETE FROM cart_items WHERE cart_id = ?`;
    const [result] = await database.query(deleteAllItemsQuery, [cart.id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "All items removed from cart", result: true });
    } else {
      res.status(404).json({ message: "No items found in cart", result: false });
    }

  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message, result: false });
  }
};


module.exports = { addOrUpdateCartItem, addToCart, updateCartItem, getUserCart, deleteProductFromCart, removeAllItemsFromCart };
