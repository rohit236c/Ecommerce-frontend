import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from '../user/Signup';
import Signin from '../user/Signin';
import Home from '../core/Home';
import UserDashboard from '../user/UserDashboard';
import PrivateRoutes from '../auth/PrivateRoutes';
import AdminRoutes from '../auth/AdminRoute';
import AdminDashboard from '../user/AdminDashboard';
import AddCategories from '../admin/AddCategories';
import AddProducts from '../admin/AddProduct';
import Shop from '../core/Shop';
import ViewProduct from '../core/Product';
import Cart from '../core/Cart';
import Orders from '../admin/Orders';
import Profile from '../user/Profile';
import UpdateProducts from '../admin/UpdateProducts';
import ManageProducts from '../admin/ManageProducts';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/shop" exact component={Shop}></Route>
                <Route path="/product/:productId" exact component={ViewProduct}></Route>
                <Route path="/cart" exact component={Cart}></Route>
                <PrivateRoutes path="/profile/:userId" exact component={Profile}></PrivateRoutes>
                <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}></PrivateRoutes>
                <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard}></AdminRoutes>
                <AdminRoutes path="/create/category" exact component={AddCategories}></AdminRoutes>
                <AdminRoutes path="/create/product" exact component={AddProducts}></AdminRoutes>
                <AdminRoutes path="/admin/orders" exact component={Orders}></AdminRoutes>
                <AdminRoutes path="/admin/products" exact component={UpdateProducts}></AdminRoutes>
                <AdminRoutes path="/admin/product/update/:productId" exact component={ManageProducts}></AdminRoutes>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes
