import { Router } from "express";
import {
  NewOrder,
  Myorders,
  Singleorder,
  Getallorders,
  DeleteOrder,
  UpdateOrder,
} from "../controllers/ordercontroller.js";
import Authenticateduser from "../middleware/auth.js";
import Role from "../middleware/Role.js";
const route = Router();

route.post("/order/new", Authenticateduser, NewOrder);
route.get("/order/:id", Authenticateduser, Singleorder);
route.get("/orders/me", Authenticateduser, Myorders);
route.get("/orders/all", Authenticateduser, Getallorders);
route.put("/admin/update/:id", Authenticateduser, Role("admin"), UpdateOrder);
route.delete("/orders/delete/:id", Authenticateduser, DeleteOrder);

export default route;
