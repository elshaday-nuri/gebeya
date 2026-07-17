const db = require("../config/db");

const Cart = {
  add: (cart, callback) => {
    const sql = `
      INSERT INTO cart
      (user_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [
        cart.user_id,
        cart.product_id,
        cart.quantity,
      ],
      callback
    );
  },

  getByUser: (userId, callback) => {
    const sql = `
      SELECT
        cart.id,
        cart.product_id,
        cart.quantity,
        products.name,
        products.price,
        products.image,
        products.stock

      FROM cart

      JOIN products
        ON cart.product_id = products.id

      WHERE cart.user_id = ?

      ORDER BY cart.id DESC
    `;

    db.query(sql, [userId], callback);
  },

  updateQuantity: (id, quantity, callback) => {
    const sql = `
      UPDATE cart
      SET quantity = ?
      WHERE id = ?
    `;

    db.query(sql, [quantity, id], callback);
  },

  remove: (id, callback) => {
    const sql = `
      DELETE FROM cart
      WHERE id = ?
    `;

    db.query(sql, [id], callback);
  },
};

module.exports = Cart;