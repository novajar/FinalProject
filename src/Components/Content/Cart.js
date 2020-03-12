import React, { Component } from 'react';
import css from './Cart.module.css';
import { connect } from 'react-redux';
import { Table, Avatar, Typography, Divider, InputNumber } from 'antd';
import { deleteCart, updateCart } from '../../actions/gallery';
import 'antd/dist/antd.css';

const { Text } = Typography;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalQty: 0,
      totalPay: 0,
      isEditing: {
        id: -1,
        qty: 0
      }
    };
  }

  componentDidMount() {
    let totalBayar = 0;
    this.props.cartAdd.forEach(({ qty, basePrice }) => {
      totalBayar += qty * basePrice;
    });
    this.setState({
      totalPay: totalBayar
    });
  }

  editOnChange = (e, id) => {
    this.setState({ isEditing: { id, qty: e } });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.cartAdd !== this.props.cartAdd) {
      let totalBayar = 0;
      this.props.cartAdd.forEach(({ qty, basePrice }) => {
        totalBayar += qty * basePrice;
      });
      this.setState({
        totalPay: totalBayar
      });
    } else {
      console.log('gagal');
    }
  }

  render() {
    console.log(this.state, 'render cartnya');
    const { deleteCart, cart, cartAdd, updateCart } = this.props;
    const { totalPay, isEditing } = this.state;

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        render: (text, record) => (
          <span key={record.id}>
            <Avatar
              shape="square"
              size={64}
              src={record.avaPhoto}
              style={{ marginRight: 16 }}
            />
            {record.title}
          </span>
        )
      },
      {
        title: 'Price',
        dataIndex: 'basePrice',
        key: 'basePrice'
      },
      {
        title: 'Qty',
        dataIndex: 'qty',
        key: 'qty'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => deleteCart(record.id)}>Delete</a>
          </span>
        )
      }
    ];
    const payment = {};

    return (
      <div>
        <div className={css.header}>
          <div className={css.headerTitle}>
            <span>Cart</span>
          </div>
        </div>
        <div style={{ width: '80%', margin: 'auto' }}>
          <div>
            <table className={css.tabel}>
              <tr className={css.tr}>
                <td style={{ width: '40%' }}>Title</td>
                <td>Price</td>
                <td>Qty</td>
                <td style={{ width: '20%' }}>Action</td>
              </tr>
              {cartAdd.map(c => (
                <tbody key={c.id} className={css.tbody}>
                  <tr>
                    <td>
                      <Avatar
                        shape="square"
                        size={64}
                        src={c.avaPhoto}
                        style={{ marginRight: 16 }}
                      />
                      {c.title}
                    </td>
                    <td style={{ textAlign: 'center' }}>{c.basePrice}</td>
                    <td style={{ textAlign: 'center' }}>
                      {isEditing.id === c.id ? (
                        <InputNumber
                          min={1}
                          max={10}
                          defaultValue={c.qty}
                          onChange={e => this.editOnChange(e, c.id)}
                        />
                      ) : (
                        c.qty
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {isEditing.id !== c.id ? (
                        <span
                          style={{ cursor: 'pointer', color: '#7d96db' }}
                          onClick={() =>
                            this.setState({
                              isEditing: { id: c.id, qty: c.qty }
                            })
                          }
                        >
                          Edit
                        </span>
                      ) : (
                        <span
                          style={{ cursor: 'pointer', color: '#7d96db' }}
                          onClick={() => {
                            updateCart(isEditing);
                            this.setState({
                              isEditing: {
                                id: -1,
                                qty: 0
                              }
                            });
                          }}
                        >
                          Save
                        </span>
                      )}
                      |
                      <span
                        style={{ cursor: 'pointer', color: '#7d96db' }}
                        onClick={() => deleteCart(c.id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
              <tr className={css.footer}>
                <td colSpan="3">Total :</td>
                <td>{totalPay}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.gallery.cart, 'cart js');
  return {
    cart: state.gallery.cart,
    cartAdd: state.gallery.cartAdd
  };
};
const mapDispatchToProps = dispatch => ({
  deleteCart: id => dispatch(deleteCart(id)),
  updateCart: (id, qty) => dispatch(updateCart(id, qty))
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
