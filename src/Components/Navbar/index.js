import React, { Component } from 'react';
import css from './Navbar.module.css';
import logo from '../../fac.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Popover, Badge, Avatar, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

export class Navbar extends Component {
  render() {
    // const { children } = this.props;
    const { cartAdd } = this.props;
    const detailQty = 0;
    const dataCart = cartAdd.map(p => (
      <div key={p.id} className={css.cart}>
        <div className={css.cartList}>
          <Avatar shape="square" size={64} src={p.avaPhoto} />
        </div>
        <div className={css.cartList}>
          <div>{p.title}</div>
          <div>
            {p.qty} x ${p.basePrice}
          </div>
        </div>
      </div>
    ));
    const gotoCart =
      cartAdd.length > 0 ? (
        <Link to="/cart">
          {' '}
          <Button type="primary" shape="round" size="large">
            See Cart
          </Button>
        </Link>
      ) : (
        ''
      );

    const qtyItem = cartAdd.reduce((sum, i) => (sum += i.qty), 0);
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
            <li className={css.nav}>
              <Link to="/poto">Gallery</Link>
            </li>
            <li className={css.nav}>
              <Link to="/vendor">Vendor</Link>
            </li>
            <li className={css.nav}>
              <Link to="/contact">Contact</Link>
            </li>
            <li
              className={css.nav}
              style={{
                width: '55px'
              }}
            >
              <Link to="/cart">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <Popover
                      placement="bottomLeft"
                      title={dataCart}
                      content={gotoCart}
                      trigger="click"
                    >
                      <ShoppingCartOutlined
                        style={{
                          fontSize: '25px',
                          marginLeft: '-15px'
                        }}
                      />
                    </Popover>
                  </div>
                  <div>
                    <Badge
                      count={qtyItem}
                      overflowCount={10}
                      style={{
                        fontSize: '12px'
                      }}
                      diameter={25}
                      showZero
                    />
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartAdd: state.gallery.cartAdd
  };
};
export default connect(mapStateToProps)(Navbar);
