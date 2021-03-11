import * as actionTypes from "./actionTypes";

export const setProductData = (data) => {
  return {
    type: actionTypes.SET_PRODUCT_LIST,
    data: data,
  };
};
