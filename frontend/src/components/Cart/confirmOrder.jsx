import React, { Fragment } from 'react'
import Checkoutstep from './Checkoutstep'
import './confirmorder.css'
import { useSelector } from 'react-redux'
import Metadata from '../layout/Metadata'
import { Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export const ConfirmOrder = () => {
  const { user } = useSelector(state => state.userReducer)
  const navigate = useNavigate()
  const { cartItems, shippingInformation } = useSelector(state => state.cart)

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInformation.address}, ${shippingInformation.city}, ${shippingInformation.state}, ${shippingInformation.pinCode}, ${shippingInformation.country}`;
  const ProceedTopayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  }
  return (
    <Fragment>
      <Metadata title={'confirm orders'} />
      <Checkoutstep activeStep={1} />
      <div className='confirmOrderPage'>
        <div>
          <div className='confirmshippingArea'>
            <Typography>Shipping Info</Typography>
            <div className='confirmshippingAreaBox'>
              <div>
                <p>name :</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone :</p>
                <span>{shippingInformation.phoneNo}</span>
              </div>
              <div>
                <p>Address :</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className='confirmCartItems'>
            <Typography>Your cart Items</Typography>
            <div className='confirmCartItemsContainer'>
              {cartItems && cartItems.map((item, i) => {
                return (
                  <div key={i}>
                    <img src={item.image} alt={'cartitem'} />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity}x ₹ {item.price}={" "}
                      <b>₹ {item.price * item.quantity}</b>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div>
          <div className='orderSummary'>
            <Typography>Order summary</Typography>
            <div >
              <div>
                <p>subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>Gst:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className='orderSummaryTotal'>
              <p>
                <b>total</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={ProceedTopayment}>Proceed To Payments</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default ConfirmOrder