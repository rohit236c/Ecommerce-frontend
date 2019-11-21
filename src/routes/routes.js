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
import AddProducts from  '../admin/AddProduct';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}></PrivateRoutes>
                <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard}></AdminRoutes>
                <AdminRoutes path="/create/category" exact component={AddCategories}></AdminRoutes>
                <AdminRoutes path="/create/product" exact component={AddProducts}></AdminRoutes>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes
