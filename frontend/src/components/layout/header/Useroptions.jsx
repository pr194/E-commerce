import React, { Fragment, useState } from 'react'
import './useroption.css'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../redux/actions/Logoutuser';
const Useroptions = ({ user }) => {
    const imgurl = `https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg`
    const navigate = useNavigate()
    const Dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const [open, setOpen] = useState(false)
    const account = () => {
        navigate('/account')
    }
    const cart = () => {
        navigate('/cart')
    }
    const orders = () => {
        navigate('/orders')
    }
    const logoutUser = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('cart')
        Dispatch(Logout())
        navigate('/login')
    }
    const Dashboard = () => {
        navigate('/admin/dashboard')
    }
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: (
                <ShoppingCartIcon style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }}
                />
            ),
            name: `Cart`,
            func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];
    if (user.role === 'admin') {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: Dashboard })
    }
    return (
        <Fragment>
            <SpeedDial ariaLabel="SpeedDial basic example" onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} direction="down" icon={<img src={user.avatar.url ? user.avatar.url : imgurl} alt="profile" className='speedDialIcon' />} className='SpeedIcon' style={{ zIndex: "11" }}>
                {options.map((item, index) => { return (<SpeedDialAction key={index} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />) })}
            </SpeedDial>
        </Fragment>
    )
}

export default Useroptions