import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import './productde.css'
import SingleProductAction from '../redux/actions/SingleProductaction'
import { useSelector, useDispatch } from 'react-redux'
import Rating from "react-rating-stars-component";
import ReviewCard from './ReviewCard'
import Loader from "../layout/Loader/Loader";
import Metadata from '../layout/Metadata'
import { AddcartItem } from '../redux/actions/cartActions'
import { reviewCreate, Resetrev } from '../redux/actions/Reviewaction'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material'
const Productdetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [ratings, setRating] = useState(0);
    const [comment, setComment] = useState("")
    const { pathname } = useLocation();
    const Dispatch = useDispatch()
    let { id } = useParams()
    const { product, Loading } = useSelector((state) => state.SinglepReducer)
    const { sucsses } = useSelector((state) => state.Review)
    const options = {
        edit: false,
        activeColor: "tomato",
        color: "rgba(20,20,20,0.1)",
        value: product.ratings,
        isHalf: true,
    };

    const addToCartHandler = () => {
        Dispatch(AddcartItem(id, quantity))
    }
    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", ratings);
        myForm.set("comment", comment);
        myForm.set("productId", id);
        Dispatch(reviewCreate(myForm))
        setOpen(false);
    };
    const Handlerating = (newrating) => {
        setRating(newrating)
    }
    useEffect(() => {
        if (sucsses) {
            Dispatch(Resetrev())
            alert('review added sucssesfully')
        }
        Dispatch(SingleProductAction(id))
        window.scrollTo(0, 0)
    }, [Dispatch, id, pathname, sucsses])
    return (
        <Fragment>
            {Loading ? <Loader /> : <Fragment>
                <Metadata title={`product-${product.name}`} />
                <div className='ProductDetails'>
                    <div className='first'>
                        <Carousel>
                            {product.images && product.images.map((item, i) => { return (<img className='CarouselImage' src={item.url} alt={`${i}`} key={i} />) })}
                        </Carousel>
                    </div>
                    <div className='second'>
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <Rating {...options} />
                            <span className="detailsBlock-2-span">
                                {" "}
                                ({product.numOfReviews} Reviews)
                            </span>
                        </div>
                        <div className="detailsBlock-3">
                            <h1>{`₹${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button
                                    disabled={product.Stock < 1 ? true : false}
                                    onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </button>
                            </div>

                            <p>
                                Status:
                                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>
                        <div className="detailsBlock-4">
                            Description : <p>{product.description}</p>
                        </div>
                        <button className="submitReview" onClick={submitReviewToggle}>
                            Submit Review
                        </button>
                    </div>
                </div>
                <h3 className='reviewsHeading'>Reviews</h3>
                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating
                            value={ratings}
                            onChange={Handlerating}
                        />

                        <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                {
                    product.reviews && product.reviews[0] ? <div className='reviews'>
                        {product.reviews.map((review, i) => { return (<ReviewCard review={review} key={i} />) })}
                    </div> : <p className='noreviews'>No reviews yet</p>
                }
            </Fragment>
            }
        </Fragment>
    )
}

export default Productdetails