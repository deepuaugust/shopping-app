import * as actionTypes from "./actionTypes";

/**
 * @description - Function to add product.
 * @param {Object} data - Payload data.
 * @returns {Object} - Returns type and payload.
 */
export function addProduct(data) {
  return {
    type: actionTypes.PRODUCT_LIST.ADD,
    payload: data,
  };
}

/**
 * @description - Function to delete product.
 * @param {Object} data - Payload data.
 * @returns {Object} - Returns type and payload.
 */
export function deleteProduct(data) {
  return {
    type: actionTypes.PRODUCT_LIST.DELETE,
    payload: data,
  };
}

/**
 * @description - Function to edit product.
 * @param {Object} data - Payload data.
 * @returns {Object} - Returns type and payload.
 */
export function editProduct(data) {
  return {
    type: actionTypes.PRODUCT_LIST.EDIT,
    payload: data,
  };
}

/**
 * @description - Function to add product to cart.
 * @param {Object} data - Payload data.
 * @returns {Object} - Returns type and payload.
 */
export function addProductCart(data) {
  return {
    type: actionTypes.SHOPPING_CART.ADD,
    payload: data,
  };
}

/**
 * @description - Function to delete product from cart.
 * @param {Object} data - Payload data.
 * @returns {Object} - Returns type and payload.
 */
export function deleteProductCart(data) {
  return {
    type: actionTypes.SHOPPING_CART.DELETE,
    payload: data,
  };
}
