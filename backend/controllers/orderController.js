const Order = require("../models/Order");
const db = require("../config/db");

// CREATE A SIMPLE ORDER
exports.createOrder = (req, res) => {
  const { user_id, total } = req.body;

  if (!user_id || total === undefined) {
    return res.status(400).json({
      message: "User ID and total are required.",
    });
  }

  Order.create(
    {
      user_id,
      total,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Order created successfully.",
        order_id: result.insertId,
      });
    }
  );
};

// GET USER ORDERS
exports.getOrders = (req, res) => {
  const userId = req.params.user_id;

  Order.getByUser(userId, (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    const orderMap = new Map();

    rows.forEach((row) => {
      if (!orderMap.has(row.order_id)) {
        orderMap.set(row.order_id, {
          id: row.order_id,
          user_id: row.user_id,
          total: row.total,
          shipping_cost: row.shipping_cost,
          status: row.status,
          created_at: row.created_at,

          shipping: {
            name: row.shipping_name,
            email: row.shipping_email,
            phone: row.shipping_phone,
            address: row.shipping_address,
            city: row.shipping_city,
            state: row.shipping_state,
            zip: row.shipping_zip,
          },

          payment_method: row.payment_method,
          items: [],
        });
      }

      if (row.order_item_id) {
        orderMap.get(row.order_id).items.push({
          id: row.order_item_id,
          product_id: row.product_id,
          name: row.product_name,
          image: row.product_image,
          quantity: row.quantity,
          price: row.price,
        });
      }
    });

    res.json(Array.from(orderMap.values()));
  });
};

// CHECKOUT
exports.checkout = async (req, res) => {
  const {
    user_id,
    shipping_name,
    shipping_email,
    shipping_phone,
    shipping_address,
    shipping_city,
    shipping_state,
    shipping_zip,
    payment_method = "cash_on_delivery",
  } = req.body;

  if (
    !user_id ||
    !shipping_name ||
    !shipping_email ||
    !shipping_phone ||
    !shipping_address ||
    !shipping_city ||
    !shipping_state ||
    !shipping_zip
  ) {
    return res.status(400).json({
      message: "Please complete all shipping fields.",
    });
  }

  const connection = db.promise();

  try {
    await connection.beginTransaction();

    const [cartItems] = await connection.query(
      `
      SELECT
        cart.product_id,
        cart.quantity,
        products.name,
        products.price,
        products.stock
      FROM cart
      JOIN products
        ON cart.product_id = products.id
      WHERE cart.user_id = ?
      FOR UPDATE
      `,
      [user_id]
    );

    if (cartItems.length === 0) {
      await connection.rollback();

      return res.status(400).json({
        message: "Your cart is empty.",
      });
    }

    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        await connection.rollback();

        return res.status(400).json({
          message: `${item.name} does not have enough stock.`,
        });
      }
    }

    const subtotal = cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price) * Number(item.quantity),
      0
    );

    const shippingCost = subtotal >= 50 ? 0 : 6.99;
    const total = subtotal + shippingCost;

    const [orderResult] = await connection.query(
      `
      INSERT INTO orders
      (
        user_id,
        total,
        shipping_cost,
        shipping_name,
        shipping_email,
        shipping_phone,
        shipping_address,
        shipping_city,
        shipping_state,
        shipping_zip,
        payment_method
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        total,
        shippingCost,
        shipping_name,
        shipping_email,
        shipping_phone,
        shipping_address,
        shipping_city,
        shipping_state,
        shipping_zip,
        payment_method,
      ]
    );

    const orderId = orderResult.insertId;

    const orderItemValues = cartItems.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    await connection.query(
      `
      INSERT INTO order_items
      (order_id, product_id, quantity, price)
      VALUES ?
      `,
      [orderItemValues]
    );

    for (const item of cartItems) {
      const [stockResult] = await connection.query(
        `
        UPDATE products
        SET stock = stock - ?
        WHERE id = ?
        AND stock >= ?
        `,
        [
          item.quantity,
          item.product_id,
          item.quantity,
        ]
      );

      if (stockResult.affectedRows === 0) {
        throw new Error(
          `Stock changed for ${item.name}. Please try again.`
        );
      }
    }

    await connection.query(
      `
      DELETE FROM cart
      WHERE user_id = ?
      `,
      [user_id]
    );

    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully.",
      order_id: orderId,
      subtotal: subtotal.toFixed(2),
      shipping: shippingCost.toFixed(2),
      total: total.toFixed(2),
    });
  } catch (error) {
    await connection.rollback();

    console.error("CHECKOUT ERROR:", error);

    res.status(500).json({
      message:
        error.message ||
        "Checkout could not be completed.",
    });
  }
};