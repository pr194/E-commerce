import OModel from "../database/models/Ordermodel.js";
import PModel from "../database/models/productModel.js";

export const NewOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = await OModel.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({
      sucsses: true,
      order,
    });
  } catch (error) {
    res.status(404).json({
      sucsses: false,
      message: `${error.message}`,
    });
  }
};
// get single order details

export const Singleorder = async (req, res) => {
  try {
    const order = await OModel.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Oops you havent any order" });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `${error.message}`,
    });
  }
};
// myorders
export const Myorders = async (req, res) => {
  try {
    const orders = await OModel.find({ user: req.user});

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(404).json({
      sucsses: false,
      message: "cant find",
    });
  }
};
//admin route get all orders

export const Getallorders = async (req, res) => {
  try {
    const orders = await OModel.find();
    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    res.status(200).json({ success: true, orders, totalAmount });
  } catch (error) {
    res.status(404).json({ success: false, message: `${error.message}kksksk` });
  }
};

// update order
export const UpdateOrder = async (req, res) => {
  try {
    const order = await OModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    if (order.orderStatus === "Delivered") {
      returnres.status(400).json({ message: "Product already deliverd" });
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });

    async function updateStock(id, quantity) {
      const product = await PModel.findById(id);

      product.stock -= quantity;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};
/// delete orders
export const DeleteOrder = async (req, res) => {
  try {
    const order = await OModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "cant find order" });
    }

    await order.remove();

    res.status(200).json({
      success: "order Deleted succesfully",
    });
  } catch (error) {
    res.status(404).json({ message: `${error.message}` });
  }
};
