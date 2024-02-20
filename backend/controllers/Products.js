
import PModel from "../database/models/productModel.js";
import ApiFeatures from "../utils/apifeatures.js";
import Cloudinary from 'cloudinary'
//amin routes -- admin
export const createProduct = async (req, res) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await Cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const Product = await PModel.create(req.body);
    res.status(200).json({
      sucsses: true,
      Product,
    });
  } catch (error) {
    res.status(500).json({
      sucsses: false,
      message: `${error.message}`,
    });
  }
};
export const Adminallproducts = async (req, res) => {
  try {
    const productscount = await PModel.countDocuments();
    const products = await PModel.find()
    res.status(200).json({ message: "succsses", products, productscount })
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

//get all products
export const Allproducts = async (req, res, next) => {
  let resultperpage = 6;
  const productscount = await PModel.countDocuments();
  try {
    const apiFeature = new ApiFeatures(PModel.find(), req.query)
      .search()
      .filter()
      .pagination(resultperpage);
    let products = await apiFeature.query;
    res.status(200).json({
      sucsses: true,
      products,
      productscount,
      resultperpage,
    });
  } catch (error) {
    res.status(500).json({
      sucsses: false,
      message: `can find ${error.message}`,
    });
  }
};
// update products-- admin
export const updateProduct = async (req, res, next) => {
  try {
    let product = await PModel.findById(req.params.id);
    product = await PModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    await product.save();
    res.status(200).json({
      sucsses: true,
      product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ sucsses: false, message: "Product not find" });
  }
};
//delte product admin
export const DeleteProduct = async (req, res) => {
  try {
    const product = await PModel.findById(req.params.id);
    await product.remove()
    for (let i = 0; i < product.images.length; i++) {
      await Cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    return res.status(200).json({
      sucsses: true,
      message: "Product Deleted succesfully",
    });

  } catch (error) {
    return res.status(500).json({
      sucsses: false,
      message: "cant find product",
    });
  }

};
//get single product
export const SingleProducts = async (req, res, next) => {
  try {
    const Product = await PModel.findById(req.params.id);
    return res.status(200).json({
      sucsses: true,
      Product,
    });
  } catch (error) {
    return res.status(500).json({
      sucsses: false,
      message: "Product doesn't exist",
    });
  }
};
export const CreateReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await PModel.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numofReviews = product.reviews.length;
    }
    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      sucsses: false,
      message: `${error.message}`,
    });
  }
};
// get all product
export const GetProductreviews = async (req, res) => {
  try {
    const product = await PModel.findById(req.query.id);

    if (!product) {
      return res
        .status(500)
        .json({ success: false, message: "cant find review" });
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `${error.message}` });
  }
};
// delete product reviews
export const DeleteProductReviews = async (req, res) => {
  try {
    const product = await PModel.findById(req.query.productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: "cant find product", success: false });
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
      product.numofReviews = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numofReviews = reviews.length;

    await PModel.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numofReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "something happend wrong",
    });
  }
};
