import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialHomeState = {
 data:0
};

const setData = (state, action) => {
  return updateObject(state, {
    data: action.data,
  });
};


const homeReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return setData(state, action);
    
    default:
      return state;
  }
};

export default homeReducer;
