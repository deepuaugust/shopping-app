/**
 * @description - Return true if the url is invalid.
 * @param {*} value - Url value.
 * @returns {boolean} - True or False.
 */
const checkUrlPattern = (value) =>
  value &&
  !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/.test(
    value
  );

/**
 * @description - Return required.
 * @param {*} value - Input value.
 * @returns {boolean} - True or False.
 */
const checkRequiredStr = (value) => {
  if (value) {
    if (typeof value === "string") {
      return value.trim();
    }
    return value;
  }
  return false;
};

const formValidators = {
  /**
   * @description - Return error if the value entered is empty..
   * @param {*} value - Value entered in input field.
   * @returns {string} - Error string or undefined.
   */
  required(value) {
    return checkRequiredStr(value) || typeof value === "number"
      ? undefined
      : "Value Required";
  },

  /**
   * @description - Return true if url is valid.
   * @param {*} value - Email value.
   * @returns {string} - Error string or undefined.
   */
  checkUrl(value) {
    let validity;
    if (checkUrlPattern(value)) {
      validity = "Invalid URL";
    }
    return validity;
  },
};

export default formValidators;
