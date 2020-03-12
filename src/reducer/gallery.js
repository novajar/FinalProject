const initialState = {
  loading: true,
  poto: [],
  errorMessage: '',
  tipe: 'ALL',
  cart: [],
  cartAdd: [],
  // related: [],
  originalPoto: [],
  detail: {}
};

const gallery = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PHOTO_REQUEST':
      return {
        ...state,
        loading: true,
        // poto: []
        poto: [...state.poto],
        originalPoto: [...state.originalPoto]
      };
    case 'FETCH_PHOTO_SUCCESS':
      return {
        ...state,
        loading: false,
        poto: action.payload,
        originalPoto: action.payload
      };
    case 'FETCH_CART_REQUEST':
      return {
        ...state,
        loading: true,
        // poto: []
        cart: [...state.cart]
      };
    case 'FETCH_CART_SUCCESS':
      return {
        ...state,
        loading: false,
        cart: action.payload
      };
    case 'FETCH_FILTER_PHOTO':
      return {
        ...state,
        loading: false,
        poto: action.payload.filter(x => x.tipe === action.tipe)
      };
    case 'FETCH_PHOTO_BY_VENDOR':
      return {
        ...state,
        loading: false,
        poto: action.payload.filter(x => x.photographer === action.id)
      };
    case 'FETCH_PHOTO_BY_ID':
      return {
        ...state,
        loading: false,
        detail: state.originalPoto.find(x => x.id === Number(action.id))
      };
    // case 'RELATED_PHOTO':
    //   console.log(action.id, 'reducer related');
    //   return {
    //     ...state,
    //     loading: false,
    //     related: action.payload.filter(x => x.photographer === action.id)
    //   };
    case 'FETCH_FILTER_PRICE':
      return {
        ...state,
        loading: false,
        poto: action.payload.filter(
          x => x.price >= action.price[0] && x.price <= action.price[1]
        )
      };
    case 'DELETE_CART':
      return {
        ...state,
        loading: false,
        cartAdd: state.cartAdd.filter(x => x.id !== action.payload)
      };
    case 'UPDATE_CART':
      return {
        ...state,
        cartAdd: state.cartAdd.map(x => {
          if (x.id === action.payload.id) {
            return {
              ...x,
              qty: action.payload.qty
            };
          } else {
            return x;
          }
        })
      };
    case 'ADD_MORE_CART':
      return {
        ...state,
        loading: false,
        cartAdd: state.cartAdd.concat({
          id: action.isiCart.idCart,
          idPhoto: action.payload.id,
          avaPhoto: action.payload.src,
          title: action.payload.title,
          basePrice: action.payload.price,
          qty: action.isiCart.qty
        })
      };
    case 'FETCH_PHOTO_ERROR':
      return {
        loading: false,
        poto: [],
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
export default gallery;
