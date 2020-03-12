import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchPhoto,
  deleteCart,
  filterPhoto,
  fetchCart
} from '../../actions/gallery';
import Sidebar from '../Navbar/sidebar';
import './ContentGallery.css';
import { Link } from 'react-router-dom';
import Product from './Product';

class App extends Component {
  constructor(props) {
    super(props);
    // this.imageDetail = this.imageDetail;

    this.state = {
      page: 1,
      update: false,
      value: '',
      tipe: 'ALL',
      isEditing: {
        id: -1,
        name: ''
      }
    };
  }
  componentDidMount() {
    this.props.fetchPhoto();
    this.props.fetchCart();
  }

  render() {
    const {
      detail,
      poto,
      data,
      fetchPhoto,
      editFilter,
      filterPhoto
    } = this.props;
    const { tipe } = this.state;

    let input;
    return (
      <>
        <div className="wrapper">
          <div className="sidebar">
            <Sidebar data={data} />
          </div>

          <div className="isi">
            {poto.map(gbr => (
              <div className="gallery" key={gbr.id}>
                {/* <div className="overlay">test</div> */}
                <Link to={'product/' + gbr.id} data="test">
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
    loading: state.gallery.loading,
    poto: state.gallery.poto,
    errorMessage: state.gallery.errorMessage,
    update: state.gallery.update,
    cart: state.gallery.cart,
    detail: state.gallery.detail
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCart: tipe => dispatch(fetchCart(tipe)),
  fetchPhoto: tipe => dispatch(fetchPhoto(tipe)),
  deleteCart: id => dispatch(deleteCart(id)),
  filterPhoto: tipe => dispatch(filterPhoto(tipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
