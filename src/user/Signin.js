import React, {useState} from 'react';
import Layout from '../core/Layout';
import {Link, Redirect} from 'react-router-dom'
import {signin, authenticate, isAuthenticated} from '../auth/index';

const Signin = () => {
    const [values,
        setValues] = useState({email: '', password: '', error: '', loading: false, redirectToReferrer: false});

    const handleChange = key => event => {
        setValues({
            ...values,
            error: false,
            [key]: event.target.value
        });
    }

    const {email, password, loading, redirectToReferrer, error} = values;
    const {user} = isAuthenticated();

    const signInForm = () => (

        <form>
            <div className="d-flex justify-content-end">
                <Link to="/signup">Signup here</Link>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange('email')}
                    className="form-control"
                    value={email}
                    type="email"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange('password')}
                    className="form-control"
                    value={password}
                    type="text"/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>

        </form>
    )

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true
        });
        signin({email, password}).then(data => {
            if (data.message) {
                setValues({
                    ...values,
                    error: data.message,
                    loading: false
                });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        })
    }

    const showErrors = () => (
        <div
            className="alert alert-danger"
            style={{
            display: error
                ? ''
                : 'none'
        }}>
            {error}
        </div>
    )
    const showLoading = () => (loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
    ));

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/"/>
        }
    }

    return (
        <Layout
            title="Sign In"
            description="Sign In to Ecommerce Node.js"
            className="container col-md-8 offset-md-2">
            {showLoading()}
            {showErrors()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin
