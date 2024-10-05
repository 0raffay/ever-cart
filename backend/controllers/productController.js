const { validate } = require("../helpers");
const database = require("../database");

const getAllProducts = async (req, res) => {
  const query = `SELECT * FROM products`;
  try {
    const [rows] = await database.query(query);
    if (rows) {
      const products = await Promise.all(
        rows.map(async (item) => {
          const _item = { ...item };
          const query = `SELECT * FROM product_images WHERE product_id = ?`;

          const [images] = await database.query(query, _item.id);
          _item.product_images = images;

          return _item;
        })
      );

      res
        .status(200)
        .json({ message: "All Products", data: products, result: true });
    } else {
      res.status(404).json({ message: "No products found", result: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Database error", error: error.message, result: false });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, categoryId, brandId } = req.body;
  const files = req.files;

  const error = validate([
    [name, "name"],
    [description, "description"],
    [price, "price"],
  ]);

  if (!error.isValid) {
    return res.status(400).json({ error: error.message });
  }

  const SKU = "SKU-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  const insertProductQuery = `
   INSERT INTO products (name, description, price, SKU, category_id, brand_id, created_at, updated_at)
   VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
 `;

  try {
    const [result] = await database.query(insertProductQuery, [
      name,
      description,
      price,
      SKU,
      categoryId,
      brandId,
    ]);

    if (!result) {
      return res
        .status(501)
        .json({ message: "Something went wrong", result: false });
    }

    const productId = result.insertId;

    if (files?.length > 0) {
      const insertImageQueries = files.map((file) => {
        const imageUrl = "/uploads/" + file.filename;
        return `INSERT INTO product_images (product_id, image_url, created_at) VALUES (${productId}, '${imageUrl}', CURRENT_TIMESTAMP)`;
      });

      await Promise.all(
        insertImageQueries.map((query) => database.query(query))
      );

      return res.status(200).json({
        message: "Product and images were added successfully",
        result: true,
      });
    }

    return res
      .status(200)
      .json({ message: "Product was added successfully", result: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database error", error: error.message, result: false });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Query to fetch the product and its associated images
    const query = `
      SELECT 
        p.*, 
        GROUP_CONCAT(pi.image_url) AS images 
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE p.id = ?
      GROUP BY p.id
    `;

    const [rows] = await database.query(query, [id]);

    if (rows && rows.length > 0) {
      const product = rows[0];

      product.images = product.images ? product.images.split(",") : [];

      res.status(201).json({
        message: "Single Product",
        result: true,
        data: product,
      });
    } else {
      res.status(404).json({
        message: "Product not found",
        result: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      result: false,
    });
    console.error("Error", error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM products WHERE id = ?";
    const [rows] = await database.query(query, [id]);
    if (rows) {
      res.status(200).json({ message: "Product Deleted", result: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", result: false });
    console.error("error", error);
  }
};

const getSingleProductById = async (id) => {
  const query = "SELECT * FROM products WHERE id = ?";
  const [rows] = await database.query(query, [id]);
  return rows?.[0] || 0;
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  getSingleProductById,
};
