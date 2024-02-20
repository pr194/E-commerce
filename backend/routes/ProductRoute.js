import { Router } from "express";
import {
  Allproducts,
  createProduct,
  updateProduct,
  DeleteProduct,
  SingleProducts,
  CreateReview,
  GetProductreviews,
  DeleteProductReviews,
  Adminallproducts
} from "../controllers/Products.js";
import Authenticateduser from "../middleware/auth.js";
import Role from "../middleware/Role.js";
const Route = Router();
Route.post("/product/new", Authenticateduser, Role("admin"), createProduct);
Route.get("/product/:id", SingleProducts);
Route.get('/admin/allproduct',Authenticateduser,Role("admin"),Adminallproducts)
Route.put("/product/:id", Authenticateduser, Role("admin"), updateProduct);
Route.delete("/product/:id", Authenticateduser, Role("admin"), DeleteProduct);
Route.get("/product", Allproducts);
Route.put("/review", Authenticateduser, CreateReview);
Route.get("/review", GetProductreviews);
Route.delete("/review", Authenticateduser, DeleteProductReviews);
export default Route;
