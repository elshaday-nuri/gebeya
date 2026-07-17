const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeCart,
} = require("../controllers/cartController");

router.post("/", addToCart);

router.get("/:user_id", getCart);

router.put("/:id", updateCartQuantity);

router.delete("/:id", removeCart);

module.exports = router;