import React, { Component } from 'react';
// import Sidebar from '../Navbar/sidebar';
import { people } from '../../Data/photographer';
import { Avatar } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './Vendor.module.css';
import {
  PhoneTwoTone,
  MailTwoTone,
  EnvironmentTwoTone
} from '@ant-design/icons';
import { fetchPhoto } from '../../actions/gallery';

class VendorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      path: ''
    };
  }
  componentDidMount() {
    let idPath = window.location.pathname.split('/')[2];
    this.setState({
      detail: people.find(x => x.id === Number(idPath)),
      path: window.location.pathname.split('/')[2]
    });
    this.props.fetchPhoto();
  }
  render() {
    const { detail } = this.state;
    const { fetchPhoto, poto } = this.props;

    return (
      <>
        <div className={css.header}>
          <span className={css.headerDetail}>Vendor Detail</span>
        </div>
        <div className={css.containerDetail}>
          <div className={css.side}>
            <div>
              <Avatar size={170} shape="square" src={detail.ava} />
            </div>
            <div style={{ fontSize: '25px' }}>{detail.nama}</div>
            {detail.phone ? (
              <div>
                <PhoneTwoTone /> {detail.phone}
              </div>
            ) : (
              ''
            )}
            {detail.email ? (
              <div>
                <MailTwoTone /> {detail.email}
              </div>
            ) : (
              ''
            )}
            {detail.location ? (
              <div>
                <EnvironmentTwoTone /> {detail.location}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={css.mapVendor}>
            {poto
              .filter(f => f.photographer == this.state.path)
              .map(gbr => (
                <div className="gallery" key={gbr.id}>
                  {/* <div className="overlay">test</div> */}
                  <Link to={'/product/' + gbr.id}>
                    <img className="img" src={gbr.src} value={gbr.id} />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    poto: state.gallery.poto
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPhoto: tipe => dispatch(fetchPhoto(tipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorList);
