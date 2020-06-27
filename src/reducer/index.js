import { combineReducers } from 'redux';
import  { reducer as formReducer } from "redux-form";
import productDetailReducer from "./productDetailReducer";
import shoppingCartReducer from "./shoppingCartReducer";

/**
 * @description - Core reducers combining all other reducers.
 */
const coreReducer = combineReducers({
  form: formReducer,
  productDetailReducer,
  shoppingCartReducer
});

export default coreReducer;
