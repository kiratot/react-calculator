/** Custom made utility functions**/

/**
 * Returns true if the button is a valid mathematical operation
 *
 * @param {string} button the sting character to check
 * @return {boolean}
 */
export const isOp = (button) => {
  return button === "+" || button === "-" || button === "x" || button === "/";
};

/**
 * Returns true if button is a valid number
 *
 * @param {string} button the string character to check
 * @returns {boolean}
 */
export const isDigit = (button) => {
  return !isNaN(button);
};

/**
 * Returns true if button is "="
 * @param {string} button the string character to check
 * @returns {boolean}
 */
export const isEqual = (button) => {
  return button === "=";
};
