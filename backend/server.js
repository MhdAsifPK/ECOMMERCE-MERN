import express from "express";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path'


dotenv.config();

connectDb();

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT;


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);


// for get current project path 
const __dirname =path.resolve()
// for get public folder path(for serving).static middlware use cheyyanth static file ne publlic aakkan)
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Ecommerce app listening on port ${port}`);
});
