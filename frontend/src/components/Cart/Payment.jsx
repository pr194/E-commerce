import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import Metadata from '../layout/Metadata'
import Checkoutstep from './Checkoutstep'
import { useNavigate } from 'react-router-dom'
import './payment.css'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { createOrder } from '../redux/actions/OrderActions'
import { useSelector, useDispatch } from 'react-redux'
const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const { shippingInformation, cartItems } = useSelector(state => state.cart)
    const navigate = useNavigate()
    const Dispath = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/sucsses')
        const order = {
            shippingInfo: shippingInformation,
            orderItems: cartItems,
            itemsPrice: orderInfo.subtotal,
            taxPrice: orderInfo.tax,
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: orderInfo.totalPrice,
        }
        order.paymentInfo={
            id: '998888888',
            status: "succeeded",
        }
           Dispath(createOrder(order))
    }
    return (
        <Fragment>
            <Metadata title={'Payment'} />
            <Checkoutstep activeStep={2} />
            <div className='paymentContainer'>
                <form className='paymentForm' onSubmit={submitHandler}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <input placeholder='card number' className='paymentInput' />
                    </div>
                    <div>
                        <EventIcon />
                        <input placeholder='expiry date' className='paymentInput' required />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <input placeholder='cvv?' className='paymentInput' required />
                    </div>
                    <input type='submit' className='paymentFormBtn' value={`Pay-${orderInfo && orderInfo.totalPrice}`} required />

                </form>
            </div>
        </Fragment>
    )
}

export default Payment