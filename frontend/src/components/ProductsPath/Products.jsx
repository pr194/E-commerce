import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from "../layout/Loader/Loader";
import Product from '../Home/Product';
import { ProductAction } from '../redux/actions/Productactions';
import { useParams,useLocation } from 'react-router-dom';
import './Products.css'
import Metadata from '../layout/Metadata';
import Pagination from "react-js-pagination"
import { Typography, Slider } from '@mui/material';


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];
const Products = () => {
    const { keyword } = useParams()
    const Dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const [Price, setPrice] = useState([0, 50000])
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const { pathname } = useLocation();
    const { products, Loading, ProductsCount, resultperpage } = useSelector((state) => state.ProductReducer)
    useEffect(() => {
        Dispatch(ProductAction(keyword, currentPage, Price, category, ratings))
        window.scrollTo(0, 0)
    }, [Dispatch, keyword, currentPage, Price, category, ratings,pathname])
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const priceHandler = (event, newprice) => {
        setPrice(newprice)
    }
    return (
        <Fragment>
            <Metadata title={" Products Shopoholics"} />
            {Loading ? <Loader /> : <Fragment>
                <h2 className='Productheading'>Products</h2>
                <div className='Products'>
                    {
                        products && products.map((product) => { return (<Product key={product._id} Product={product} />) })
                    }
                </div>
                <div className='filterBox'>
                    <Typography>Price</Typography>
                    <Slider value={Price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby='range-slider' min={0} max={50000}>

                    </Slider>
                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li
                                className="category-link"
                                key={category}
                                onClick={() => setCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                    <fieldset>
                        <Typography component="legend" style={{ marginTop: 10 }}>Ratings</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRating) => {
                                setRatings(newRating);
                            }}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        />
                    </fieldset>
                </div>
                {resultperpage < ProductsCount && <div className="paginationBox">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultperpage}
                        totalItemsCount={ProductsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>}
            </Fragment>}
        </Fragment>
    )
}

export default Products