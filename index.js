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
// Middlewares
// Used to facilitate communication between the frontend and backend servers
const allowedDomains = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedDomains.indexOf(origin) !== -1) {
            // The origin of the request is allowed
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

const app = express();
app.use(express.json());

// Use the following line to enable CORS with restrictions
// app.use(cors(corsOptions));

// Use this line to enable CORS allowing all origins (for development purposes)
app.use(cors());

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
