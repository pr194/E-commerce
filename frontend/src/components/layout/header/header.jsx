import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "./main-logo.png";
import { MdSearch } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "150px",
  logoHeight: "100px",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "white",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  searchIcon: true,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement: MdAddShoppingCart,
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  profileIcon: true,
  profileIconColor: "red",
  profileIconUrl: "/login",
  profileIconColorHover: "#eb4034",
  ProfileIconElement: BsFillPersonFill,
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
