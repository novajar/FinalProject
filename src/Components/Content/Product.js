import React, { Component } from 'react';
import css from './Product.module.css';
import { Avatar, InputNumber, Button, Divider } from 'antd';
import { connect } from 'react-redux';
// import Sidebar from '../Navbar/sidebar';
// import { Redirect, Refresh } from 'react-router-dom';
import {
  fetchPhoto,
  fetchMoreCart,
  deleteCart,
  updatePerson,
  filterPhoto,
  filterPhotoById
  // fetchRelated
} from '../../actions/gallery';
class Product extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      idPhoto: window.location.pathname.split('/')[2],

      isiCart: {
        qty: 1,
        idCart: 0
      },
      id: 0,
      path: ''
    };
  }
  async componentDidMount() {
    let id = window.location.pathname.split('/')[2];
    this.props.fetchPhoto();
    await this.props.filterPhotoById(id);
    let lastCartID = this.props.cartAdd[this.props.cartAdd.length - 1];
    let lastID;
    if (this.props.cartAdd.length < 1) {
      lastID = 0;
    } else {
      lastID = lastCartID.id + 1;
    }

    this.setState({
      ...this.state,
      isiCart: {
        ...this.state.isiCart,
        idCart: lastID + 1
      }
    });
    // this.props.fetchRelated(this.props.detail.photographer);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   let id = window.location.pathname.split('/')[2];
  //   console.log(prevState, this.state, 'goes here outer');

  //   if (
  //     prevProps.originalPoto.length !== this.props.originalPoto.length ||
  //     prevState.path !== this.state.path
  //   ) {
  //     console.log('goes here');
  //     // this.props.fetchPhoto();
  //     // this.props.filterPhotoById(id);
  //     // this.props.fetchRelated(this.state.idPhotographer);
  //     // this.setState({
  //     //   ...this.state,
  //     //   redirect: false
  //     // });
  //   }
  // }

  onChange(value) {
    this.setState({
      // qty: value,
      isiCart: {
        ...this.state.isiCart,
        qty: value
      }
    });
  }
  onClick(value) {
    let lastCartID = this.props.cartAdd[this.props.cartAdd.length - 1];
    let lastID;
    if (this.props.cartAdd.length < 1) {
      lastID = 0;
    } else {
      lastID = lastCartID.id + 1;
    }

    this.setState({
      ...this.state,
      isiCart: {
        ...this.state.isiCart,
        idCart: this.state.isiCart.idCart + 1
      }
    });
    this.props.fetchMoreCart(this.props.detail, this.state.isiCart);
  }

  // setRedirectTo = id => {
  //   this.setState({
  //     ...this.state,
  //     path: window.location.pathname,
  //     id
  //   });
  //   // this.props.filterPhotoById(id);
  // };

  render() {
    // let pathID = window.location.pathname.split('/')[2];
    let cartID = 3;
    const {
      poto,
      originalPoto,
      detail,
      // related,
      fetchMoreCart,
      filterPhotoById
    } = this.props;
    const { isiCart } = this.state;
    // console.log('render', this.state.path);
    // if (id) {
    //   return <Redirect to={`/product/${id}`} />;
    // }

    return (
      <>
        <div className={css.header}>
          <div className={css.headerTitle}>
            <span>Product</span>
          </div>
        </div>
        <div className={css.wrapper}>
          <div className={css.konten}>
            {/* <Sidebar /> */}
            <div className={css.konten}>
              <div style={{ marginRight: '15px' }}>
                <Avatar shape="square" size={400} src={detail.src} />
              </div>
              <div>
                <h1>{detail.title}</h1>
                <h3>${detail.price}</h3>
                <Divider />
                <h3>Photo Detail</h3>
                <p>SKU: N/A</p>
                <p>Categories: {detail.tipe}</p>
                <p>Product ID: {detail.id}</p>
                <Divider />
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={1}
                  onChange={this.onChange}
                />
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  // onClick={() => {
                  //   this.setState({
                  //     ...this.state,
                  //     isiCart: {
                  //       ...this.state.isiCart,
                  //       idCart: this.state.isiCart.idCart + 1
                  //     }
                  //   });
                  //   fetchMoreCart(detail, isiCart);
                  // }}
                  onClick={this.onClick}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={css.related}>
          <div className={css.footerTitle}>Related Product</div>
          <div className={css.avatar}>
            {originalPoto
              .filter(f => f.photographer === detail.photographer)
              .map(r => (
                <div key={r.id}>
                  <Avatar
                    onClick={() => filterPhotoById(r.id)}
                    shape="square"
                    size={300}
                    src={r.src}
                  />
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
    cartAdd: state.gallery.cartAdd,
    related: state.gallery.related,
    errorMessage: state.gallery.errorMessage,
    update: state.gallery.update,
    originalPoto: state.gallery.originalPoto,
    detail: state.gallery.detail
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPhoto: tipe => dispatch(fetchPhoto(tipe)),
  deleteCart: id => dispatch(deleteCart(id)),
  fetchMoreCart: (data, isiCart) => dispatch(fetchMoreCart(data, isiCart)),
  filterPhoto: tipe => dispatch(filterPhoto(tipe)),
  filterPhotoById: idPhoto => dispatch(filterPhotoById(idPhoto))
  // fetchRelated: id => dispatch(fetchRelated(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);
