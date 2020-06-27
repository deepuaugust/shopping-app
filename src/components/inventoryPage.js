import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { Field, reduxForm, formValueSelector, reset } from "redux-form";
import { v4 as uuidv4 } from "uuid";
import { addProduct, deleteProduct, editProduct } from "../actions";
import { connect } from "react-redux";
import styles from "./inventoryPage.style";
import formValidators from "../utils/formValidators";

/**
 * @description - Input text field component for redux form.
 */
const renderField = ({
  input,
  style,
  label,
  type,
  meta: { touched, error },
}) => (
  <div>
    <div>
      <input className={style} {...input} type={type} placeholder={label} />
      {touched && error && (
        <span style={{ color: "red", fontSize: "12px" }}>*{error}</span>
      )}
    </div>
  </div>
);

/**
 * @description - Renders the inventory page component.
 * @returns {Node} - Returns html.
 */
class InventoryPage extends Component {
  /**
   * @description - Constructor for the class.
   * @param {Object} props - Object props.
   */
  constructor(props) {
    super(props);
    this.state = {
      currentData: [],
      isEdit: false,
    };
  }

  /**
   * @description = Lifecycle hook.
   */
  componentDidMount() {
    this.handleInventoryChanges();
  }

  /**
   * @description = Lifecycle hook.
   * @param {Object} prevProps - Previous props object.
   */
  componentDidUpdate(prevProps) {
    const { productList } = this.props;
    if (productList !== prevProps.productList) {
      this.handleInventoryChanges();
    }
  }

  /**
   * @description - Initialize form data on mount.
   */
  initializeForm = () => {
    const { currentData } = this.state;
    const { initialize } = this.props;
    const formData = {
      inventoryFormValues: [...currentData],
    };
    if (formData) {
      console.log(formData);
      initialize(formData);
    }
  };

  /**
   * @description - Edit function for each product.
   * @param {Object} data - Data object.
   * @param {Number} ind - Index value.
   */
  editProduct = (data, ind) => {
    const { currentData } = this.state;
    const { change } = this.props;
    const inventoryVal = data;
    inventoryVal.isEdit = true;
    change(`inventoryFormValues[${ind}]`, inventoryVal);
    this.setState({
      isEdit: true,
      currentData,
    });
  };

  /**
   * @description - Save function for each product.
   * @param {Object} values - Form values object.
   * @param {Object} data - Data object.
   * @param {Number} ind - Index value.
   */
  saveProduct = (values, data, ind) => {
    const { currentData } = this.state;
    const { dispatch } = this.props;
    const inventoryVal = data;
    inventoryVal.isEdit = false;
    this.setState({
      isEdit: false,
      currentData,
    });
    const item = {
      title: values.inventoryFormValues[ind].title,
      price: values.inventoryFormValues[ind].price,
      image: values.inventoryFormValues[ind].image,
      description: values.inventoryFormValues[ind].description,
      id: values.inventoryFormValues[ind].id,
    };
    dispatch(editProduct(item));
  };

  /**
   * @description - Function to add product to list.
   * @param {Object} values - Form values object.
   */
  addProduct = (values) => {
    const { dispatch } = this.props;
    dispatch(reset("inventoryForm"));
    const item = { ...values.addInventory, id: uuidv4() };
    dispatch(addProduct(item));
  };

  /**
   * @description - Remove product from inventory.
   * @param {Object} data - Data object.
   */
  removeProduct = (data) => {
    const { isEdit } = this.state;
    const { dispatch } = this.props;
    this.setState({
      isEdit: false,
    })
    dispatch(deleteProduct(data));
  };

  /**
   * @description - Function which checks when tank details are present.
   */
  handleInventoryChanges = () => {
    const { currentData } = this.state;
    const { productList } = this.props;
    if (this.checkInventoryData(productList, currentData)) {
      this.setState(
        {
          currentData: productList,
        },
        this.initializeForm()
      );
    }
  };

  /**
   * @description - Check tank data change.
   * @param {Array} poolList - List details.
   * @param {Array} currentData - Current list.
   * @returns {boolean} - Checked result.
   */
  checkInventoryData = (productList, currentData) =>
    productList !== undefined && productList !== currentData;

  /**
   * @description - Renders the text field for edit.
   * @param {Object} val - Data object.
   * @param {Number} index - Index value.
   * @param {String} key - Field value.
   */
  renderEditTextField = (val, index, key, label) => {
    const { classes } = this.props;
    return val.isEdit ? (
      <Field
        name={`inventoryFormValues[${index}].${key}`}
        type={key === "price" ? "number" : "text"}
        component={renderField}
        label={label}
        style={classes.inputStyles}
        validate={
          key !== "image"
            ? [formValidators.required]
            : [formValidators.required, formValidators.checkUrl]
        }
      />
    ) : (
      <div className={classes.textDiv}>
        {label}: {val[key]}
      </div>
    );
  };

  /**
   * @description - Renders the text field for add.
   * @param {String} key - Field value.
   * @param {String} label - Label value.
   */
  renderAddTextField = (key, label) => {
    const { classes } = this.props;
    return (
      <Field
        name={`addInventory.${key}`}
        type={key === "price" ? "number" : "text"}
        component={renderField}
        label={label}
        style={classes.inputStyles}
        validate={
          key !== "image"
            ? [formValidators.required]
            : [formValidators.required, formValidators.checkUrl]
        }
      />
    );
  };

  /**
   * @description - Renders the add form html.
   * @returns {Node} - Returns the html for add form.
   */
  renderAddForm = () => {
    const { classes, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.rowFlex}>
          <div className={classes.fullWidth}>
            {this.renderAddTextField("title", "Title")}
          </div>
          <div className={classes.fullWidth}>
            {this.renderAddTextField("price", "Price in dollars")}
          </div>
        </div>
        <div className={classes.columnFlex}>
          {this.renderAddTextField("image", "Image url")}
        </div>
        <div className={classes.columnFlex}>
          {this.renderAddTextField("description", "Description")}
        </div>
        <button
          className={classes.buttonStyles}
          type="button"
          onClick={handleSubmit((values) => this.addProduct(values))}
        >
          Add product
        </button>
      </form>
    );
  };

  /**
   * @description - Function to check if any product is in edit mode.
   * @param {Object} data - Data object.
   * @param {Number} index - Index value.
   * @param {String} action - Action to be performed.
   */
  checkEdit = (data, index, action) => {
    const { currentData } = this.state;
    const editInventory = currentData.find((x) => x.isEdit === true);
    if (editInventory && data.isEdit && action === "delete")
      this.removeProduct(data);
    else if (editInventory)
      alert("Please make sure to save changes before proceeding.");
    else {
      if (action == "edit") this.editProduct(data, index);
      else this.removeProduct(data);
    }
  };

  /**
   * @description - Renders the list of products component.
   * @returns {Node} - Returns the html for list of products.
   */
  renderProductList = () => {
    const { classes, productList, handleSubmit } = this.props;
    return (
      <div>
        {productList.map((val, index) => (
          <div className={classes.productDiv} key={index}>
            <div className={classes.rowFlex}>
              <div className={classes.fullWidth}>
                {this.renderEditTextField(val, index, "title", "Title")}
              </div>
              <div className={classes.fullWidth}>
                {this.renderEditTextField(
                  val,
                  index,
                  "price",
                  "Price in dollars"
                )}
              </div>
            </div>
            <div className={classes.columnFlex}>
              {this.renderEditTextField(val, index, "image", "Image Url")}
            </div>
            <div className={classes.columnFlex}>
              {this.renderEditTextField(
                val,
                index,
                "description",
                "Description"
              )}
            </div>
            <button
              className={classes.buttonStyles}
              type="button"
              onClick={() => this.checkEdit(val, index, "delete")}
            >
              Remove product
            </button>
            {!val.isEdit ? (
              <button
                className={classes.buttonStyles}
                type="button"
                onClick={() => this.checkEdit(val, index, "edit")}
              >
                Edit product
              </button>
            ) : (
              <button
                className={classes.buttonStyles}
                type="button"
                onClick={handleSubmit((values) =>
                  this.saveProduct(values, val, index)
                )}
              >
                Save product
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  /**
   * @description - Renders the inventory page.
   * @returns {Node} - Return html for inventory page.
   */
  render() {
    const { classes } = this.props;
    const { isEdit } = this.state;
    return (
      <Fragment>
        <div className={classes.container}>
          <h3>INVENTORY</h3>
          {this.renderProductList()}
          {!isEdit ? this.renderAddForm() : null}
        </div>
      </Fragment>
    );
  }
}

const selector = formValueSelector("inventoryForm");

/**
 * @description Map all form state to props.
 * @param {Object} state - State.
 * @returns {Object} - Props.
 */
function mapStateToProps(state) {
  return {
    productList: state.productDetailReducer,
    inventoryFormValues: selector(state, "inventoryFormValues"),
  };
}

InventoryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

InventoryPage.defaultProps = {};

const inventoryForm = connect(mapStateToProps)(
  injectSheet(styles)(InventoryPage)
);
export default reduxForm({ form: "inventoryForm" })(inventoryForm);
