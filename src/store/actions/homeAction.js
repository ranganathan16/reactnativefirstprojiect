import * as actionTypes from "./actionTypes";

export const setData = (data) => {
  return {
    type: actionTypes.SET_DATA,
    data: data,
  };
};
