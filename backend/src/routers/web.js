const express = require("express");
const router = express.Router();
const CategoryController = require("../apps/controllers/apis/category");
const ProductController = require("../apps/controllers/apis/product");
const OrderController = require("../apps/controllers/apis/order");
const AuthController = require("../apps/controllers/apis/authController")
const CustomerController = require("../apps/controllers/apis/customerController")
const authMw = require("../apps/middlewares/authMw")

router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.get("/categories/:id/products", CategoryController.productsCategory);
router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
router.get("/products/:id/comments", ProductController.comments);
router.post("/products/:id/comments", ProductController.storeComments);
router.post("/order",authMw.verifyAuthenticationCustomer, OrderController.order);

router.post("/customer/login",AuthController.loginCustomer)
router.get("/customer/test",authMw.verifyAuthenticationCustomer,(req,res)=>{
    res.json("hi")
})
router.post("/customer/register",AuthController.register)   
router.post("/customer/update",authMw.verifyAuthenticationCustomer,CustomerController.update)   

router.get("/customer/:id/orders",authMw.verifyAuthenticationCustomer,OrderController.ordersCustomer);
router.get("/customer/order/:id",authMw.verifyAuthenticationCustomer, OrderController.orderDetail);

module.exports = router;