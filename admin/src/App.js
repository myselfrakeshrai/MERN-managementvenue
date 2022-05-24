import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import InvitationScreen from "./screens/InvitationScreen";
import VendorScreen from "./screens/VendorScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import AddInvitation from "./screens/AddInvitation";
import AddVendor from "./screens/AddVendor";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import InvitationEditScreen from "./screens/InvitationEditScreen";
import VendorEditScreen from "./screens/VendorEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listInvitations } from "./Redux/Actions/InvitationActions";
import { listVendors } from "./Redux/Actions/VendorActions";
import { listOrders } from "./Redux/Actions/OrderActions";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      dispatch(listInvitations());
      dispatch(listVendors());
      dispatch(listOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/invitations" component={InvitationScreen} />
          <PrivateRouter path="/vendors" component={VendorScreen} />
          <PrivateRouter path="/category" component={CategoriesScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/addinvitation" component={AddInvitation} />
          <PrivateRouter path="/addvendor" component={AddVendor} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
            />
          <PrivateRouter
            path="/invitation/:id/edit"
            component={InvitationEditScreen}
          />
          <PrivateRouter
            path="/vendor/:id/edit"
            component={VendorEditScreen}
          />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
