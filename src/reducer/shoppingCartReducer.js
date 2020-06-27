import { SHOPPING_CART } from "../actions/actionTypes";

const initialState = [];
/**
 * @description Reducer for shopping cart.
 * @param {Object} state - State.
 * @param {Object} action - Action.
 * @returns {Object} State.
 */
const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOPPING_CART.ADD:
      return (state = [...state, action.payload]);
    case SHOPPING_CART.DELETE:
      return (state = [...state.filter((val, index) => val.id !== action.payload.id)]);
    default:
      return state;
  }
};

export default shoppingCartReducer;
