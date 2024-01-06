import express from "express";
import { test, getSales, getSale, createSale, updateSale } from "../controllers/salesController.js";

const router = express.Router();

// Public Routes
router.get("/test", test);

// Sales Management Routes
router.get("/get", getSales);
router.get("/get/:id", getSale);
router.post("/create", createSale);
router.put("/update/:id", updateSale);

export default router;

