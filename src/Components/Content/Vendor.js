import React, { Component } from 'react';
// import Sidebar from '../Navbar/sidebar';
import { people } from '../../Data/photographer';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import css from './Vendor.module.css';
class Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className={css.header} />
        <div className={css.container}>
          <div>
            <h1>Vendor List</h1>
          </div>
          <div className={css.mapVendor}>
            {people.map(p => (
              <Link to={'vendorList/' + p.id} data="test" className={css.link}>
                <div key={p.id} className={css.vendor}>
                  <div>
                    <Avatar size={150} src={p.ava} />
                  </div>
                  <div className={css.namaVendor}>{p.nama}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }
}
export default Vendor;
