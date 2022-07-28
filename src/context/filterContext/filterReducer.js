import { RESET_FILTER, SET_BRANDS, SET_PRICE, SET_RATING, SET_TYPES } from '../../constant/type';
export const filterReducer = (state, action) => {
  const { type, result } = action;

  switch (type) {
    case SET_BRANDS:
      return {
        ...state,
        brands: result,
        showBtn: true,
      };
    case SET_RATING:
      return {
        ...state,
        showBtn: true,
        rating: result,
      };
    case SET_TYPES:
      return { ...state, showBtn: true, types: result };
    case SET_PRICE:
      return {
        ...state,
        showBtn: true,
        price: {
          ...state.price,
          max: typeof result.max === 'number' ? result.max : parseFloat(result.max),
          min: typeof result.min === 'number' ? result.min : parseFloat(result.min),
        },
      };
    case RESET_FILTER:
      return {
        ...result,
        showBtn: false,
      };

    default:
      break;
  }
};
