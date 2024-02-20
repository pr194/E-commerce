import React, { Fragment, useEffect } from 'react'
import './orderdet.css'
import { useParams,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { Singleorder } from '../redux/actions/OrderActions'
import Metadata from '../layout/Metadata'
import {Typography} from '@mui/material'
const OrderDetails = () => {
    const Dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            Dispatch(Singleorder(id))
        }

    }, [Dispatch, id])
    const { order, Loading } = useSelector((state) => state.singleorderdetail)
    return (
        <Fragment>
            <Metadata title={'Order-Details'} />
            {Loading ? <Loader /> : <Fragment>
                <Metadata title="Order Details" />
                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <Typography component="h1">
                            Order #{order && order._id}
                        </Typography>
                        <Typography>Shipping Info</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Name:</p>
                                <span>{order.user && order.user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>
                                    {order.shippingInfo && order.shippingInfo.phoneNo}
                                </span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>
                                    {order.shippingInfo &&
                                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                </span>
                            </div>
                        </div>
                        <Typography>Payment</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.paymentInfo &&
                                            order.paymentInfo.status === "succeeded"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order.paymentInfo &&
                                        order.paymentInfo.status === "succeeded"
                                        ? "PAID"
                                        : "NOT PAID"}
                                </p>
                            </div>

                            <div>
                                <p>Amount:</p>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>

                        <Typography>Order Status</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.orderStatus && order.orderStatus === "Delivered"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order.orderStatus && order.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="orderDetailsCartItems">
                        <Typography>Order Items:</Typography>
                        <div className="orderDetailsCartItemsContainer">
                            {order.orderItems &&
                                order.orderItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X ₹{item.price} ={" "}
                                            <b>₹{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </Fragment>}

        </Fragment>
    )
}

export default OrderDetails