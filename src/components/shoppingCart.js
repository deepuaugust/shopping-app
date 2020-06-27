import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { deleteProductCart } from "../actions";
import { connect } from "react-redux";
import styles from "./shoppingCart.style";

/**
 * @description - Renders the inventory page component.
 * @returns {Node} - Returns html.
 */
class ShoppingCart extends Component {
  /**
   * @description - Constructor for the class.
   * @param {Object} props - Object props.
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - Function to product from cart.
   * @param {Object} data - Data object.
   */
  removeProductCart = (data) => {
    const { dispatch } = this.props;
    dispatch(deleteProductCart(data));
  };

  /**
   * @description - Function which renders the shopping cart html.
   * @param {Array} cart_items - Array of cart items. 
   * @param {Number} total_price - Total price of cart.
   * @returns {Node} - Returns the html for shopping cart. 
   */
  renderShoppingCart = (cart_items, total_price) => {
    const { classes, cartList } = this.props;
    return (
      <Fragment>
        {cart_items.map((val, index) => (
          <div className={classes.columnFlex} key={index}>
            <div className={classes.contentDiv}>
              {val.title}
              <div className={classes.rightAlign}>{val.price}$</div>
              <div
                className={classes.closeDiv}
                onClick={() => this.removeProductCart(val)}
              >
                x
              </div>
            </div>
            <div className={classes.contentDiv}>
              Quantity:{" "}
              <div className={classes.rightAlign}>
                {cartList.filter((x) => x.id === val.id).length}
              </div>
            </div>
          </div>
        ))}
        {cartList.length > 0 ? (
          <div className={classes.totalDiv}>Total: {total_price}$</div>
        ) : null}
      </Fragment>
    );
  };

  /**
   * @description - Renders the html for shopping cart.
   * @returns {Node} - Returns the html shopping cart.
   */
  render() {
    const { classes, cartList, productList } = this.props;
    // Gets unique items in cart by checking those exisitng in product list.
    let cartItemsUnique = productList.filter((val) =>
      cartList.find((item) => item.id === val.id)
    );
    // Gets all values in added in cart by checking those in product list.
    let cartItems = cartList.filter((val) =>
      productList.find((item) => item.id === val.id)
    );
    // totalPrice variable loops through the cart items and adds the total price value of all items.
    let totalPrice = cartItems
      .map((val) => productList.find((x) => x.id == val.id).price)
      .reduce((acc, curr) => {
        return Number(acc) + Number(curr);
      }, 0);
    return (
      <Fragment>
        <div className={classes.container}>
          <h3>SHOPPING CART</h3>
          {this.renderShoppingCart(cartItemsUnique, totalPrice)}
        </div>
      </Fragment>
    );
  }
}

/**
 * @description Map all form state to props.
 * @param {Object} state - State.
 * @returns {Object} - Props.
 */
function mapStateToProps(state) {
  return {
    productList: state.productDetailReducer,
    cartList: state.shoppingCartReducer,
  };
}

ShoppingCart.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

ShoppingCart.defaultProps = {};

export default injectSheet(styles)(connect(mapStateToProps)(ShoppingCart));
