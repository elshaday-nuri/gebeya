const db = require("../config/db");

const Order = {
  create: (order, callback) => {
    const sql = `
      INSERT INTO orders
      (user_id, total)
      VALUES (?, ?)
    `;

    db.query(
      sql,
      [order.user_id, order.total],
      callback
    );
  },

  getByUser: (userId, callback) => {
    const sql = `
      SELECT
        orders.id AS order_id,
        orders.user_id,
        orders.total,
        orders.shipping_cost,
        orders.status,
        orders.created_at,
        orders.shipping_name,
        orders.shipping_email,
        orders.shipping_phone,
        orders.shipping_address,
        orders.shipping_city,
        orders.shipping_state,
        orders.shipping_zip,
        orders.payment_method,

        order_items.id AS order_item_id,
        order_items.product_id,
        order_items.quantity,
        order_items.price,

        products.name AS product_name,
        products.image AS product_image

      FROM orders

      LEFT JOIN order_items
        ON orders.id = order_items.order_id

      LEFT JOIN products
        ON order_items.product_id = products.id

      WHERE orders.user_id = ?

      ORDER BY orders.created_at DESC, order_items.id ASC
    `;

    db.query(sql, [userId], callback);
  },
};

module.exports = Order;