import React, { Fragment, useEffect } from "react";
import "./home.css";
import { CgMouse } from "react-icons/cg";
import Metadata from "../layout/Metadata";
import { ProductAction } from '../redux/actions/Productactions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from "../layout/Loader/Loader";
import Product from "./Product";
const Home = () => {
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(ProductAction())
  }, [Dispatch])
  const { products, Loading } = useSelector((state) => state.ProductReducer)
  return (
    <Fragment>
      {Loading ? <Loader /> : <Fragment>
        <>
          <Metadata title={"Shopoholics"} />
        </>
        <div className="banner">
          <p>Welcome to Shopoholics</p>
          <h1>Find Amazing Products Below</h1>
          <a href="#container">
            <button>x
              Scroll <CgMouse />{" "}
            </button>
          </a>
        </div>
        <h2 className="homeheading">Featured Products</h2>
        <div className="container" id="container">
          {products && products.map((product) => { return (<Product Product={product} key={product._id}/>) })}
        </div>
      </Fragment>}
    </Fragment>
  );
};

export default Home;
