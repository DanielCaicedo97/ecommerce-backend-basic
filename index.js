import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileupload from "express-fileupload";
import connectionDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

import productRouter from "./routes/productRoutes.js";
import salesRouter from "./routes/salesRoutes.js";

const PORT = process.env.PORT || 4000;
dotenv.config();
connectionDB();

const app = express();
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./files",
  })
);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/sales", salesRouter);

app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}...`);
});
