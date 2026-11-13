import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import hotelReducer from "./Hotel/hotelReducer";

const store = createStore(
  hotelReducer,
  applyMiddleware(thunk)
);

export default store;
