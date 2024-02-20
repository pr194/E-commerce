import { Router } from "express";
import {
  RegisterUser,
  Login,
  Logout,
  userDetail,
  Updatepassword,
  UpdateProfile,
  GetAllUser,
  singleUser,
  UpdateRole,
  DelteUser,
} from "../controllers/userController.js";
import Authenticateduser from "../middleware/auth.js";
import Role from "../middleware/Role.js";
const route = Router();

route.post("/register", RegisterUser);
route.post("/login", Login);
route.get("/logout", Logout);
route.get("/me", Authenticateduser, userDetail);
route.put("/password/update", Authenticateduser, Updatepassword);
route.put("/me/update", Authenticateduser, UpdateProfile);
route.get("/admin/users", Authenticateduser, Role("admin"), GetAllUser);
route.get("/admin/user/:id", Authenticateduser, Role("admin"), singleUser);
route.put("/admin/user/:id", Authenticateduser, Role("admin"), UpdateRole);
route.delete("/admin/user/:id", Authenticateduser, Role("admin"), DelteUser);

export default route;
