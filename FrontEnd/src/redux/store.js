import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducers/UserReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("CART_ITEMS")
  ? JSON.parse(localStorage.getItem("CART_ITEMS"))
  : [];
const userInfoFromLocalStorage = localStorage.getItem("USER_INFO")
  ? JSON.parse(localStorage.getItem("USER_INFO"))
  : [];
const shippingAddressFromLocalStorage = localStorage.getItem("SHIPPING_ADDRESS")
  ? JSON.parse(localStorage.getItem("SHIPPING_ADDRESS"))
  : [];
const paymentMethodFromLocalStorage = localStorage.getItem("PAYMENT_METHOD")
  ? JSON.parse(localStorage.getItem("PAYMENT_METHOD"))
  : [];

const initState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
