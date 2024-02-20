import Header from "./components/layout/header/header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import WebFont from "webfontloader";
import Footer from "./components/layout/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home/Home";
import Productdetails from "./components/Products/Productdetails";
import Products from "./components/ProductsPath/Products";
import Search from "./components/search/Search";
import Loginsignup from "./components/user/Loginsignup";
import { Profile } from "./components/redux/actions/Profile";
import "./App.css";
import Useroptions from "./components/layout/header/Useroptions";
import ProfileU from "./components/UserProfile/Profile";
import Dashboard from "./components/Admin/Dashboard";
import UpdateProfile from "./components/UserProfile/updateProfile";
import UpdatePassword from "./components/user/updatePassword";
import Cart from "./components/Cart/cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/confirmOrder";
import Payment from "./components/Cart/Payment";
import Sucsses from "./components/Cart/Sucsses";
import Myorders from "./components/order/Myorders";
import { UserOrderaction } from './components/redux/actions/OrderActions'
import OrderDetails from "./components/order/OrderDetails";
import Productlist from "./components/Admin/Productlist";
import OrderList from "./components/Admin/orderDetails";
import NewProduct from "./components/Admin/newProduct";
import UsersList from "./components/Admin/userList";

function App() {
  const Dispatch = useDispatch()
  const { IsAuthenticated, user } = useSelector((state) => state.userReducer)
  const { orders } = useSelector(state => state.Userorder)
  const cookie = window.localStorage.getItem('token')
  useEffect(() => {
    if (cookie) {
      Dispatch(Profile(cookie))
    }
    Dispatch(UserOrderaction())
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

  }, [cookie, Dispatch]);

  return (

    <Router forceRefresh={true}>
      <Header />
      {IsAuthenticated && <Useroptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<ProfileU />} />
        {IsAuthenticated && <Route path="/me/update" element={<UpdateProfile />} />}
        {IsAuthenticated && <Route path="/password/update" element={<UpdatePassword />} />}
        {IsAuthenticated && user.role === 'admin' && <Route path="/admin/dashboard" element={<Dashboard />} />}
        {IsAuthenticated && user.role === 'admin' && <Route path="/admin/products" element={<Productlist/>} />}
        {IsAuthenticated && user.role === 'admin' && <Route path="/admin/orders" element={<OrderList/>} />}
        <Route path="/admin/product/new" element={<NewProduct/>}/>
        <Route path="/product/:id" element={<Productdetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="products/product/:id" element={<Productdetails />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/login" element={<Loginsignup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        {IsAuthenticated && <Route path="/order/confirm" element={<ConfirmOrder />} />}
        <Route path="/process/payment" element={<Payment />} />
        <Route path="/sucsses" element={<Sucsses />} />
        {orders.length > 0 && <Route path="/orders" element={<Myorders />} />}
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route  path="/admin/users" element={<UsersList/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
