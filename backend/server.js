import dotenv from "dotenv";
import express from "express";
import Route from "./routes/ProductRoute.js";
import Uroute from "./routes/userRoutes.js";
import ConnectDB from "./database/dbconnect.js";
import cookieParser from "cookie-parser";
import Oroute from "./routes/orderroutes.js"
import Cors from 'cors'
import bodyparser from "body-parser"
import Clodinary from 'cloudinary'
import fileUpload from "express-fileupload";
//handeling uncaught exception
process.on("uncaughtException", () => {
  console.log("shuting down server due to uncaught error");
  process.exit(1);
});
dotenv.config();
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(Cors())
app.use(bodyparser.urlencoded({extended:true}))
app.use(fileUpload())
ConnectDB(process.env.DB_URL);
Clodinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
})
app.use("/api/v1", Uroute); ///user Routes
app.use("/api/v1", Route); // Products routes
app.use("/api/v1",Oroute)
const Server = app.listen(process.env.PORT, () => {
  console.log(`server started on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error);
  console.log("closing the server");
  Server.close(() => {
    process.exit(1);
  });
});
