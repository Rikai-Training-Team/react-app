import { SET_INIT_PRODUCTS, SET_NO_PRODUCTS_FOUND, SET_PRODUCTS } from '../../constant/type';
export const productReducer = (state, action) => {
  const { type, result } = action;
  switch (type) {
    case SET_INIT_PRODUCTS:
      return {
        ...state,
        initProducts: result,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: result,
        message: '',
      };
    case SET_NO_PRODUCTS_FOUND:
      return {
        ...state,
        message: result,
      };
    default:
      break;
  }
};
