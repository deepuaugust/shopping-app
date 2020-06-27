import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import InventoryPage from "./components/inventoryPage";
import ShoppingCart from "./components/shoppingCart";
import ProductList from "./components/productList";
import styles from "./App.style";

/**
 * @description - Render the App class.
 * @returns {Node} - HTML code.
 */
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.container}>
          <div className={classes.fullWidth}>
            <ProductList />
          </div>
          <div className={classes.fullWidth}>
            <ShoppingCart />
          </div>
          <div className={classes.fullWidth}>
            <InventoryPage onSubmit={this.handleSubmit} />
          </div>
        </div>
      </Fragment>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

App.defaultProps = {};

export default injectSheet(styles)(connect()(App));
