import express from "express";
import { test } from "../controllers/productController.js";

const router = express.Router();
// Rutas Publicas
router.get("/test", test);

export default router;
