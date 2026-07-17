const express=require("express");

const router=express.Router();


const {
  createOrder,
  getOrders,
  checkout,
} = require("../controllers/orderController");



router.post("/",createOrder);


router.get("/:user_id",getOrders);

router.post("/checkout", checkout);

module.exports=router;