import React from 'react'
import { useDispatch } from 'react-redux'
import './cartItemcard.css'
import { Link } from 'react-router-dom'
import { Removefromcart } from '../redux/actions/cartActions'

const CartItemcard = ({ item }) => {
    const dispatch = useDispatch()
    return (
        <div className='CartItemCard'>
            <img src={item.image} alt={'itemlg'} />
            <div >
                <Link to={`/products/${item.product}`}>{item.name}</Link>
                <span>{`price ₹${item.price}`}</span>
                <p onClick={() => { dispatch(Removefromcart(item.product)) }}>remove</p>
            </div>
        </div>
    )
}

export default CartItemcard