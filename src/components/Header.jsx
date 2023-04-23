import React from 'react';
import { Link } from "react-router-dom";
import Search from "./Search";

function Header() {
    return (
        <div className="header">
            <div className="container">
                <Link to="/">
                    <div className="header__logo">
                        <img width="38" src="./assets/img/pizza-logo.svg" alt="Pizza logo"/>
                        <div>
                            <h1>React Pizza</h1>
                            <p>найсмачніша піца в Україні</p>
                        </div>
                    </div>
                </Link>
                <Search />
                <div className="header__cart">
                    <Link to="/cart" className="button button--cart">
                        <span>520 ₴</span>
                        <div className="button__delimiter"></div>
                        <div className="header__cart-quantity">
                            <img src="./assets/img/cart.svg" alt="Cart logo" />
                            <span>3</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;