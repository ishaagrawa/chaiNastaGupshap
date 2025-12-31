import React, { useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../assets/images/res-logo.png";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import "../../styles/header.css";

const nav__links = [
  { display: "Home", path: "/home" },
  { display: "Foods", path: "/pizzas" },
  { display: "Cart", path: "/cart" },
  { display: "Contact", path: "/contact" },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    menuRef.current?.classList.toggle("show__menu");
  };

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("header__shrink");
      } else {
        headerRef.current?.classList.remove("header__shrink");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo" onClick={() => navigate("/home")}>
            {/* <img src={logo} alt="logo" /> */}
            <h5>Tasty Treat</h5>
          </div>

          <div className="navigation" ref={menuRef}>
            <div className="menu d-flex align-items-center gap-5">
              <div className="header__closeButton">
                <span onClick={toggleMenu}>
                  <i className="ri-close-fill"></i>
                </span>
              </div>

              {nav__links.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "active__menu" : ""
                  }
                  onClick={toggleMenu}
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
