import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import Metadata from "../layout/Metadata";


const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate("/products");
        }
    };

    return (
        <Fragment>
            <Metadata title={"search Products"} />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;