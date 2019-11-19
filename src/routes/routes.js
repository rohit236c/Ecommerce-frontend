import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from '../user/Signup';
import Signin from '../user/Signin';
import Home from '../core/Home';
import UserDashboard from '../user/UserDashboard';
import PrivateRoutes from '../auth/PrivateRoutes';
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}></PrivateRoutes>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
