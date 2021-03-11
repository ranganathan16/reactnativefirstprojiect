import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialHomeState = {
 productlist:[],
 
};

const setProductData = (state, action) => {
  return updateObject(state, {
    productlist: action.data,
  });
};


const homeReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCT_LIST:
      return setProductData(state, action);
    
    default:
      return state;
  }
};

export default homeReducer;
