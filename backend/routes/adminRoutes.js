const express = require("express");

const authenticateToken = require(
  "../middleware/authMiddleware"
);

const requireAdmin = require(
  "../middleware/adminMiddleware"
);

const Product = require("../models/Product");
const db = require("../config/db");

const router = express.Router();

router.get(
  "/dashboard",
  authenticateToken,
  requireAdmin,
  (req, res) => {
    res.json({
      message: "Welcome Admin 👋",
      admin: req.user,
    });
  }
);

// Get all products
router.get(
  "/products",
  authenticateToken,
  requireAdmin,
  (req, res) => {
    Product.getAll((err, products) => {
      if (err) {
        return res.status(500).json({
          message: "Products could not be loaded.",
          error: err.message,
        });
      }

      res.json(products);
    });
  }
);

// Get categories for the admin form
router.get(
  "/categories",
  authenticateToken,
  requireAdmin,
  (req, res) => {
    const sql = `
      SELECT id, name
      FROM categories
      ORDER BY name
    `;

    db.query(sql, (err, categories) => {
      if (err) {
        return res.status(500).json({
          message: "Categories could not be loaded.",
          error: err.message,
        });
      }

      res.json(categories);
    });
  }
);

// Add a product
router.post(
  "/products",
  authenticateToken,
  requireAdmin,
  (req, res) => {
    const {
      name,
      description,
      price,
      stock,
      image,
      category_id,
    } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      stock === undefined ||
      !category_id
    ) {
      return res.status(400).json({
        message: "Please complete all required product fields.",
      });
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);
    const numericCategoryId = Number(category_id);

    if (
      Number.isNaN(numericPrice) ||
      numericPrice < 0
    ) {
      return res.status(400).json({
        message: "Enter a valid product price.",
      });
    }

    if (
      !Number.isInteger(numericStock) ||
      numericStock < 0
    ) {
      return res.status(400).json({
        message: "Stock must be a whole number.",
      });
    }

    Product.create(
      {
        name: name.trim(),
        description: description.trim(),
        price: numericPrice,
        stock: numericStock,
        image: image?.trim() || null,
        category_id: numericCategoryId,
      },
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Product could not be added.",
            error: err.message,
          });
        }

        res.status(201).json({
          message: "Product added successfully.",
          product_id: result.insertId,
        });
      }
    );
  }
);
router.delete(
  "/products/:id",
  authenticateToken,
  requireAdmin,
  (req, res) => {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        message: "Invalid product ID.",
      });
    }

    Product.delete(productId, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Product could not be deleted.",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Product not found.",
        });
      }

      res.json({
        message: "Product deleted successfully.",
      });
    });
  }
);

module.exports = router;