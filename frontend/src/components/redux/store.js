import { configureStore } from "@reduxjs/toolkit"
import Product from "./reducers/ProductReducer"
import SingleProduct from "./reducers/SingleproductReducer"
import User from "./reducers/user"
import ProfileUpdate from "./reducers/userprofileupfate"
import Cart from "./reducers/cart"
import order from './reducers/orderReducer'
import Myorders from "./reducers/Myorder"
import SingleOrderDetails from "./reducers/Singleorder"
import Review from "./reducers/Review"
import Adminallproduct from "./reducers/AdminAllproduct"
import { getallorder } from './reducers/AdminorderReducer'
import { Aalluser } from "./reducers/adminUser"
import NewProduct from './reducers/createnewProduct'
import {AdminDeleteuser}from './reducers/Allusers'
const store = configureStore({
    reducer: {
        ProductReducer: Product,
        SinglepReducer: SingleProduct,
        userReducer: User,
        Updateuser: ProfileUpdate,
        cart: Cart,
        order: order,
        Userorder: Myorders,
        singleorderdetail: SingleOrderDetails,
        Review: Review,
        adminAllorder: getallorder,
        adminAlluser: Aalluser,
        adminallProduct:Adminallproduct,
        newProduct:NewProduct,
        deleteuser:AdminDeleteuser
    }
})
export default store