import React, { Fragment } from 'react'
import CartItemcard from './cartItemcard'
import { useSelector, useDispatch } from 'react-redux'
import { AddcartItem } from '../redux/actions/cartActions'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from '@mui/material'
import { Link,useNavigate } from 'react-router-dom'
import './cart.css'
import Metadata from '../layout/Metadata';

const Cart = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { cartItems } = useSelector((state) => state.cart)
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(AddcartItem(id, newQty));
    };
    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(AddcartItem(id, newQty));
    };
    const handleShipping = async () => {
          navigate('/shipping')
    }
    return (
        <Fragment>{cartItems.length === 0 ? <div className="emptyCart">
               <Metadata title={`Cart (${cartItems.length})`}/>
            <RemoveShoppingCartIcon />

            <Typography>No Product in Your Cart</Typography>
            <Link to="/products">View Products</Link>
        </div> :
            <Fragment>
            <Metadata title={`Cart (${cartItems.length})`}/>
                <div className='cartPage'>
                    <div className='cartHeader'>
                        <p>Products</p>
                        <p>quantitiy</p>
                        <p>subtotal</p>
                    </div>
                    {cartItems && cartItems.map((item, i) => {
                        return (
                            <div className='cartContainer' key={i}>
                                <CartItemcard item={item} />
                                <div className='cartInput'>
                                    <button onClick={() => decreaseQuantity(
                                        item.product,
                                        item.quantity,
                                        item.stock
                                    )}>-</button>
                                    <input type='number' readOnly value={item.quantity} />
                                    <button onClick={() => increaseQuantity(
                                        item.product, item.quantity
                                    )}>+</button>
                                </div>
                                <p className='cartSubtotal'>{`₹ ${item.price * item.quantity}`}</p>
                            </div>
                        )
                    })}
                    <div></div>
                    <div className='cartSubtotal'>
                        <p>Gross total</p>&nbsp;
                        <p>{`₹${cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                        )}`}</p>

                    </div>
                    <div></div>
                    <div className='checkOutBtn'>

                        <button onClick={handleShipping}>Check out</button>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default Cart