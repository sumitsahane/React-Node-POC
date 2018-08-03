import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "../redux/reducers";
import promise from "./promise";

const enhancer = compose(applyMiddleware(thunk, promise));

const store = createStore(reducer, enhancer);

export default store;
