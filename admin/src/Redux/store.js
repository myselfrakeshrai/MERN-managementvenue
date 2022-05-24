import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  invitationCreateReducer,
  invitationDeleteReducer,
  invitationEditReducer,
  invitationListReducer,
  invitationUpdateReducer,
} from "./Reducers/InvitationReducers";
import {
  vendorCreateReducer,
  vendorDeleteReducer,
  vendorEditReducer,
  vendorListReducer,
  vendorUpdateReducer,
} from "./Reducers/VendorReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducres";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  invitationList: invitationListReducer,
  invitationDelete: invitationDeleteReducer,
  invitationCreate: invitationCreateReducer,
  invitationEdit: invitationEditReducer,
  invitationUpdate: invitationUpdateReducer,
  vendorList: vendorListReducer,
  vendorDelete: vendorDeleteReducer,
  vendorCreate: vendorCreateReducer,
  vendorEdit: vendorEditReducer,
  vendorUpdate: vendorUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
