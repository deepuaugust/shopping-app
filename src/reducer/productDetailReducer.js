import { PRODUCT_LIST } from "../actions/actionTypes";

const initialState = [];
/**
 * @description Reducer for product list.
 * @param {Object} state - State.
 * @param {Object} action - Action.
 * @returns {Object} State.
 */
const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST.ADD:
      return (state = [...state, action.payload]);
    case PRODUCT_LIST.DELETE:
      return (state = [...state.filter((val, index) => val.id !== action.payload.id)]);
    case PRODUCT_LIST.EDIT:
      return state.map(s => s.id === action.payload.id ?
        Object.assign({}, s, action.payload) : s );
    default:
      return state;
  }
};

export default productDetailReducer;
