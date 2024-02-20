import UModel from "../database/models/userModel.js";
import sendEmail from "../utils/sendemail.js";
import crypto, { createHash } from "crypto";
import Cloudinary from 'cloudinary'
export const RegisterUser = async (req, res) => {
  try {

    const { name, email, password, avatar } = req.body;
    const myCloud = await Cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    })
    const user = await UModel.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    const token = user.getJwttoken();

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      sucsses: false,
      message: `error occured ${error.message}`,
    });
  }
};
export const Login = async (req, res, next) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ sucsses: false, message: "Please enter email password" });
    }
    const user = await UModel.findOne({ email: email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ sucsses: false, message: "User not found" });
    }

    const matched = await user.comparePassword(password);
    if (!matched) {
      return res
        .status(401)
        .json({ sucsses: false, message: "Invalid credentials" });
    }
    const token = user.getJwttoken();

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res
      .status(401)
      .json({ sucsses: false, message: `cant find user ${error.message}` });
  }
};
export const Logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "succesfully logged out",
  });
};

export const ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "cant find user",
      });
    }
    const resettoken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = createHash("sha256")
      .update(resettoken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resettoken}`;

    const message = `your password reset token is\n\n ${url}`;
    try {
      await sendEmail({
        email: user.email,
        subject: "eccomerce password reset",
        message: message,
      });
      res.status(200).json({
        message: `email sent to ${user.email} sucssesfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({
        message: error.message,
      });
    }
  } catch (error) { }
};

// single user detail
export const userDetail = async (req, res) => {
  try {
    const user = await UModel.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        sucsses: false,
        message: "cant find user",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      sucsses: false,
      message: `${error.message}`,
    });
  }
};
// update password
export const Updatepassword = async (req, res) => {
  try {
    const user = await UModel.findById(req.user.id).select("+password");
    const matched = await user.comparePassword(req.body.oldPassword);
    if (!matched) {
      return res
        .status(400)
        .json({ sucsses: false, message: "password is incorrect" });
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({
        sucsses: false,
        message: "Password and new password doesn't match",
      });
    }
    user.password = req.body.newPassword;
    await user.save();
    const token = user.getJwttoken();
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};
//update profile
export const UpdateProfile = async (req, res) => {
  try {
    const userdata = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar !== "") {
  
      const user = await UModel.findById(req.user.id)
      const imageid = user.avatar.public_id
      await Cloudinary.v2.uploader.destroy(imageid)
      const myCloud = await Cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      })

      userdata.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,

      }
    }
    const user = await UModel.findByIdAndUpdate(req.user.id, userdata, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "sucssesfully updated",
    });
  } catch (error) {
    res.status(404).json({
      success: true,
      message: `cant update`,
    });
  }
};
//get all user admin route
export const GetAllUser = async (req, res) => {
  try {
    const user = await UModel.find();
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "cant find user",
    });
  }
};
export const singleUser = async (req, res) => {
  try {
    const user = await UModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "cant find user",
    });
  }
};
/// updating role admin route
export const UpdateRole = async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    await UModel.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "cant update role",
    });
  }
};

// deleting users admin route
export const DelteUser = async (req, res) => {
  try {
    const user = await UModel.findById(req.params.id);
    if (!user) {
      res.status(402).json({
        success: false,
        message: "cant find user",
      });
    }
    await user.remove();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};
