import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import productReducer from "./productReducer";

export default combineReducers({
  formReducer,
  products: productReducer,
});
