import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const Product = ({ Product }) => {
  const options = {
    edit: false,
    activeColor: "tomato",
    color: "rgba(20,20,20,0.1)",
    value: Product.ratings,
    isHalf: true,
  };
  return (
    <Link to={`product/${Product._id}`} className="productcard">
      <img src={Product.images[0].url} alt={Product.name} style={{ height: 250 }} />
      <p>{Product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>{Product.numofReviews}(Reviews)</span>
      </div>
      <span>{`₹ ${Product.price}`}</span>
    </Link>
  );
};

export default Product;
