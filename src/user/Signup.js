import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {signup} from '../auth/index';
import {Link} from 'react-router-dom';
import {getRoles} from './apiUser';

const Signup = () => {

    const [values,
        setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        role: '0'
    });
    const [roles,
        setRoles] = useState([]);
    const handleChange = key => event => {
        setValues({
            ...values,
            error: false,
            [key]: event.target.value
        })
    }
    const loadRoles = () => {
        getRoles().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRoles(data);
            }
        }).catch((err) => {
            console.log(err);
        });
    };
    useEffect(() => {
        loadRoles();
    }, []);
    const {
        name,
        email,
        password,
        success,
        error,
        role
    } = values;

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange('name')}
                    className="form-control"
                    value={name}
                    type="text"/>
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
                    type="password"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Roles</label>
                <select onChange={handleChange('role')} className="form-control">
                    <option>Select any one role</option>
                    {roles && roles.map((r, i) => (
                        <option key={i} value={r.role_id}>{r.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: false
        })
        signup({name, email, password, role}).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    success: false
                });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
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
    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{
            display: success
                ? ''
                : 'none'
        }}>
            New Account is created. Please
            <Link to="/signin">Sign in</Link>
        </div>
    )

    return (
        <Layout
            title="Sign Up"
            description="Sign Up to Ecommerce Node.js"
            className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showErrors()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup
