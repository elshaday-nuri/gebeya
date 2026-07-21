const db = require("../config/db");

const Product = {
  getAll: (callback) => {
    const sql = `
      SELECT
        products.id,
        products.name,
        products.description,
        products.price,
        products.stock,
        products.image,
        products.category_id,
        categories.name AS category
      FROM products
      LEFT JOIN categories
        ON products.category_id = categories.id
      ORDER BY products.id DESC
    `;

    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `
      SELECT
        products.id,
        products.name,
        products.description,
        products.price,
        products.stock,
        products.image,
        products.category_id,
        categories.name AS category
      FROM products
      LEFT JOIN categories
        ON products.category_id = categories.id
      WHERE products.id = ?
    `;

    db.query(sql, [id], callback);
  },

  create: (product, callback) => {
    const sql = `
      INSERT INTO products
      (
        name,
        description,
        price,
        stock,
        image,
        category_id
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        product.name,
        product.description,
        product.price,
        product.stock,
        product.image,
        product.category_id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    const sql = `
      DELETE FROM products
      WHERE id = ?
    `;

    db.query(sql, [id], callback);
  },
};

module.exports = Product;