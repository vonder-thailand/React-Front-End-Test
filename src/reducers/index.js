import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { doneReducer } from './doneReducer'
import { subCartReducer } from './subCartReducer'

const rootReducer = combineReducers({
  cart: cartReducer,
  done: doneReducer,
  subcart: subCartReducer,
});

export default rootReducer;