import React, { Component } from 'react';
import css from './Navbar.module.css';
import logo from '../../fac.svg';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    // const { children } = this.props;
    return (
      <div className={css.containerNav}>
        <div>
          <img src={logo} className={css.logo} alt="Logo" />
        </div>
        <div>
          <ul>
            <li className={css.nav}>
              <Link to="/">Home</Link>
            </li>
            {/* <li className={css.nav}>
              <Link to="/services">Services</Link>
            </li> */}
            <li className={css.nav}>
              <Link to="/poto">Gallery</Link>
            </li>
            <li className={css.nav}>
              <Link to="/vendor">Vendor</Link>
            </li>
            {/* <li className={css.nav}>
              <Link to="/">Blog</Link>
            </li> */}
            <li className={css.nav}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className={css.nav}>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
