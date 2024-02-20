import React from "react";
import playstore from "./playstore.png";
import appstore from "./Appstore.png";
import "./footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Dawnload our app</h4>
        <p>Dawnload app for ios and android phones</p>
        <img src={playstore} alt="logoappstore" />
        <img src={appstore} alt="logoappstore" />
      </div>
      <div className="midFooter">
        <h1>Shopoholics.</h1>
        <p>High quality is our first Priority</p>
        <p>cpoyright 2023 &copy; Prince Yadav</p>
      </div>
      <div className="rightFooter">
        <h4>Our socials</h4>
        <a href="https://instagram.com/iam_prince_yadav">Instagram</a>
        <a href="https://twitter.com">Twitter</a>
        <a href="https://facebook.com">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
