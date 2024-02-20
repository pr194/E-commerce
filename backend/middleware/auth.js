import Jwt from "jsonwebtoken";
import userModel from "../database/models/userModel.js";
const Authenticateduser = async (req, res, next) => {
  let { token } = req.headers
  if (!token) {
    return res.status(401).json({
      sucsses: false,
      message: "please login first to acsses this resource",
    });
  }
  const decode = Jwt.verify(token, process.env.SECRET_KEY);
  req.user = await userModel.findById({ _id: decode.id });
  next();
};
export default Authenticateduser;
