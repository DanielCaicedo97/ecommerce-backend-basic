import express from "express";
import {
  test,
  deleteProducts,
  getProduct,
  getProducts,
  createProducts,
  updateProducts,
} from "../controllers/productController.js";

const router = express.Router();

// Public Routes
router.get("/test", test);

// Product Management Routes
router.get("/get", getProducts);
router.get("/get/:id", getProduct);
router.post("/create", createProducts);
router.put("/update/:id", updateProducts);
router.delete("/delete/:id", deleteProducts);

export default router;
