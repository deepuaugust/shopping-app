import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { deleteProduct, addProductCart } from "../actions";
import { connect } from "react-redux";
import styles from "./productList.style";

/**
 * @description - Renders the inventory page component.
 * @returns {Node} - Returns html.
 */
class ProductList extends Component {
  /**
   * @description - Constructor for the class.
   * @param {Object} props - Object props.
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - Remove product from list.
   * @param {Object} data - Data Object. 
   */
  removeProduct = (data) => {
    const { dispatch } = this.props;
    dispatch(deleteProduct(data));
  };

  /**
   * @description - Function to add product to cart.
   * @param {Object} data - Add data to cart. 
   */
  addToCart = (data) => {
    const { dispatch } = this.props;
    dispatch(addProductCart(data));
  };

  /**
   * @description - Renders the product list component.
   * @returns {Node} - Returns the html for product list component.
   */
  render() {
    const { classes, productList } = this.props;
    return (
      <Fragment>
        <div className={classes.container}>
          <h3>LIST OF PRODUCTS</h3>
          {productList.map((val, index) => (
            <div className={classes.rowFlex} key={index}>
              <div className={classes.listWidth}>
                <img className={classes.imgStyles} src={val.image} />
              </div>
              <div className={classes.listWidth} style={{width: '60%'}}>
                <div className={classes.textDiv}>
                  {val.title}
                  <div className={classes.priceDiv}>{val.price}$</div>
                </div>
                <div className={classes.textDiv}>
                  Description: {val.description}
                </div>
                <div className={classes.textDiv}>
                <button 
                  className={classes.buttonStyles}
                  onClick={() => this.addToCart(val)}
                >
                  Add to cart
                </button>
                </div>
              </div>
            </div>
          ))}
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
  };
}

ProductList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

ProductList.defaultProps = {};

export default injectSheet(styles)(connect(mapStateToProps)(ProductList));
