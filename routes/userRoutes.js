import express from "express";
import {
  test,
  register,
  confirm,
  profile,
  authentication,
} from "../controllers/userController.js";
// middleware para validar el token
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/test", test);
router.post("/", register);
router.get("/confirm/:token", confirm);
router.get("/auth", authentication);
// Rutas Protegidas atraves del middleware checkAuth
// Identificamos el usuario y se identifica para mostrale los datos o
//funcionalidades que le corresponden.
router.get("/profile", checkAuth, profile);

export default router;
