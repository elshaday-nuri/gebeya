const Cart = require("../models/Cart");

exports.addToCart = (req, res) => {
  const {
    user_id,
    product_id,
    quantity = 1,
  } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({
      message: "User and product are required.",
    });
  }

  Cart.add(
    {
      user_id,
      product_id,
      quantity,
    },
    (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message: "Product added to cart.",
      });
    }
  );
};

exports.getCart = (req, res) => {
  const userId = req.params.user_id;

  Cart.getByUser(userId, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(result);
  });
};

exports.updateCartQuantity = (req, res) => {
  const id = req.params.id;
  const quantity = Number(req.body.quantity);

  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({
      message: "Quantity must be at least 1.",
    });
  }

  Cart.updateQuantity(id, quantity, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cart item not found.",
      });
    }

    res.json({
      message: "Cart quantity updated.",
    });
  });
};

exports.removeCart = (req, res) => {
  const id = req.params.id;

  Cart.remove(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cart item not found.",
      });
    }

    res.json({
      message: "Product removed from cart.",
    });
  });
};