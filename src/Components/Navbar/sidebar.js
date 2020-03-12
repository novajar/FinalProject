import React, { Component } from 'react';
import css_side from './Sidebar.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Slider, Input, Card, Avatar, Button } from 'antd';
import {
  fetchPhoto,
  filterPhoto,
  filterPrice,
  fetchCart,
  deleteCart,
  filterPhotoByVendor
} from '../../actions/gallery';
import 'antd/dist/antd.css';
import { people } from '../../Data/photographer';
import { DeleteOutlined } from '@ant-design/icons';

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.onAfterChange = this.onAfterChange.bind(this);
    this.state = {
      // page: 1,
      // update: false,
      // value: '',
      tipe: 'ALL',
      price: [100, 150]
      // isEditing: {
      //   id: -1,
      //   name: ''
      // }
    };
  }
  // componentDidMount() {
  //   this.props.fetchCart();
  // }

  editFilter = tipe => {
    this.setState({ tipe: tipe });
    // alert(tipe);
    // filterPhoto(this.state.tipe);
    filterPhoto(this.state.tipe);
  };
  onAfterChange(value) {
    this.setState({ price: value });
    this.props.filterPrice(value);
  }

  render() {
    // const { children } = this.props;
    const {
      filterPhoto,
      fetchPhoto,
      filterPrice,
      cart,
      cartAdd,
      deleteCart,
      filterPhotoByVendor
    } = this.props;
    const { Search } = Input;
    const { Meta } = Card;
    return (
      <div className={css_side.side_container}>
        {/* <div className={css_side.cards}>
          <Card size="small" title="Search" style={{ borderRadius: '5px' }}>
            <div>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                enterButton
              />
            </div>
          </Card>
        </div> */}
        <div className={css_side.cards}>
          {' '}
          <Card
            size="small"
            title="Shopping Cart"
            style={{ borderRadius: '5px' }}
          >
            <div className={css_side.vendor}>
              {cartAdd.map(p => (
                <div key={p.id} className={css_side.ava}>
                  <div>
                    <Avatar shape="square" size={64} src={p.avaPhoto} />
                  </div>
                  <div className={css_side.cartContainer}>
                    <div className={css_side.cartPhotoName}>{p.title}</div>
                    {/* <div className="cartVendor">Nama Vendor</div> */}
                    <div>
                      {p.qty} x ${p.basePrice}
                    </div>
                  </div>
                  <div
                    className={css_side.delete}
                    onClick={() => deleteCart(p.id)}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
              ))}
              {cartAdd.length > 0 ? (
                <Link to="/cart">
                  {' '}
                  <Button type="primary" shape="round" size="large">
                    See Cart
                  </Button>
                </Link>
              ) : (
                ''
              )}
            </div>
          </Card>
        </div>
        <div className={css_side.cards}>
          <Card
            size="small"
            title="Filter Price"
            style={{ borderRadius: '5px' }}
          >
            <Slider
              range
              step={5}
              defaultValue={[50, 150]}
              min={50}
              max={300}
              onAfterChange={this.onAfterChange}
            />
          </Card>
        </div>
        <div className={css_side.cards}>
          {' '}
          <Card size="small" title="Vendor" style={{ borderRadius: '5px' }}>
            {/* <Card style={{ width: 300, marginTop: 16 }}> */}
            <div className={css_side.vendor}>
              {people.map(p => (
                <div key={p.id} className={css_side.ava}>
                  <div>
                    <Avatar size={64} src={p.ava} />
                  </div>
                  <div
                    className={css_side.namaVendor}
                    onClick={() => {
                      filterPhotoByVendor(p.id);
                    }}
                  >
                    {p.nama}
                  </div>
                </div>
              ))}
            </div>
            {/* </Card> */}
          </Card>
        </div>
        <div className={css_side.cards}>
          <Card
            size="small"
            title="Category"
            style={{ borderRadius: '5px', height: 'auto' }}
          >
            <div>
              {/* <li onClick={() => this.editFilter('family')}>Family</li> */}
              <span
                onClick={() => {
                  this.setState(
                    state => ({ tipe: 'ALL' }),
                    () => {
                      fetchPhoto(this.state.tipe);
                    }
                  );
                }}
              >
                ALL
              </span>
              <span
                onClick={() => {
                  this.setState(
                    state => ({ tipe: 'nature' }),
                    () => {
                      filterPhoto(this.state.tipe);
                    }
                  );
                }}
              >
                Nature
              </span>
              <span
                onClick={() => {
                  this.setState(
                    state => ({ tipe: 'family' }),
                    () => {
                      filterPhoto(this.state.tipe);
                    }
                  );
                }}
              >
                Family
              </span>
              <span
                onClick={() => {
                  this.setState(
                    state => ({ tipe: 'travel' }),
                    () => {
                      filterPhoto(this.state.tipe);
                    }
                  );
                }}
              >
                Travel
              </span>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.gallery.loading,
    cart: state.gallery.cart,
    cartAdd: state.gallery.cartAdd,
    errorMessage: state.gallery.errorMessage
  };
};
const mapDispatchToProps = dispatch => ({
  // fetchCart: tipe => dispatch(fetchCart(tipe)),
  fetchPhoto: tipe => dispatch(fetchPhoto(tipe)),
  filterPhoto: tipe => dispatch(filterPhoto(tipe)),
  filterPhotoByVendor: id => dispatch(filterPhotoByVendor(id)),
  deleteCart: id => dispatch(deleteCart(id)),
  filterPrice: price => dispatch(filterPrice(price))
});
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
