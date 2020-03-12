import axios from 'axios';
import { photos } from '../Data/photo';
import { cart } from '../Data/Cart';
let idCart = 2;

const fetchPhotoAsync = () => ({
  type: 'FETCH_PHOTO_REQUEST'
});

const fetchPhotoSuccess = payload => ({
  type: 'FETCH_PHOTO_SUCCESS',
  payload
});

const fetchCartSuccess = payload => ({
  type: 'FETCH_CART_SUCCESS',
  payload
});

const fetchPhotoError = payload => ({
  type: 'FETCH_PHOTO_ERROR',
  payload
});
const fetchMoreCartAsync = (payload, isiCart) => ({
  type: 'ADD_MORE_CART',
  payload,
  isiCart
});
const fetchFilterPhoto = (payload, tipe) => ({
  type: 'FETCH_FILTER_PHOTO',
  payload,
  tipe
});
const fetchFilterPhotoByVendor = (payload, id) => ({
  type: 'FETCH_PHOTO_BY_VENDOR',
  payload,
  id
});
const fetchPhotoById = id => ({
  type: 'FETCH_PHOTO_BY_ID',

  id
});
const fetchFilterPrice = (payload, price) => ({
  type: 'FETCH_FILTER_PRICE',
  payload,
  price
});
// export const relatedPhoto = (payload, id) => ({
//   type: 'RELATED_PHOTO',
//   payload,
//   id
// });
export const deleteCart = payload => ({
  type: 'DELETE_CART',
  payload
});
export const updateCart = payload => ({
  type: 'UPDATE_CART',
  payload
});
// export const addCart = payload => ({
//   type: 'ADD_MORE_CART',
//   payload
// });
export const fetchPhoto = (tipe = 'ALL') => dispatch => {
  dispatch(fetchPhotoAsync());
  try {
    const addId = photos.map(x => ({ ...x }));
    dispatch(fetchPhotoSuccess(addId));
  } catch (e) {
    dispatch(fetchPhotoError(e));
  }
};
export const filterPhoto = (tipe = 'ALL') => async dispatch => {
  try {
    const addId = photos.map(x => ({ ...x }));
    dispatch(fetchFilterPhoto(addId, tipe));
  } catch (e) {
    console.error(e);
  }
};
export const filterPhotoByVendor = (id = 0) => async dispatch => {
  try {
    const addId = photos.map(x => ({ ...x }));
    dispatch(fetchFilterPhotoByVendor(addId, id));
  } catch (e) {
    console.error(e);
  }
};
export const filterPhotoById = (id = 0) => async dispatch => {
  try {
    dispatch(fetchPhotoById(id));
  } catch (e) {
    console.error(e);
  }
};
// export const fetchRelated = (id = 0) => async dispatch => {
//   try {
//     const addId = photos.map(x => ({ ...x }));
//     dispatch(relatedPhoto(addId, id));
//   } catch (e) {
//     console.error(e);
//   }
// };
export const filterPrice = (price = [100, 150]) => async dispatch => {
  try {
    const addId = photos.map(x => ({ ...x }));
    dispatch(fetchFilterPrice(addId, price));
  } catch (e) {
    console.error(e);
  }
};
export const fetchCart = (id = 0) => dispatch => {
  // dispatch(fetchCartAsync());
  try {
    const addId = cart.map(x => ({ ...x }));
    dispatch(fetchCartSuccess(addId));
  } catch (e) {
    console.error(e);
  }
};
export const fetchMoreCart = (data, isiCart) => async dispatch => {
  try {
    dispatch(fetchMoreCartAsync(data, isiCart));
  } catch (e) {
    console.error(e);
  }
};
