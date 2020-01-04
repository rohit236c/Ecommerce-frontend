import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link, Redirect} from 'react-router-dom';
import {getProfile, updateUser, updateProfile} from './apiUser';

const Profile = (props) => {
    const [values,
        setValues] = useState({name: '', email: '', password: '', error: '', success: false});
    const {name, email, password, error, success} = values;

    const {user, token} = isAuthenticated();

    const init = (userId) => {
        console.log(userId, "user");
        getProfile(userId, token).then((data) => {
            if (data.error) {
                setValues({
                    ...values,
                    error: true
                });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    email: data.email
                });
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    useEffect(() => {
        init(props.match.params.userId);
    }, [])

    const handleChange = key => (e) => {
        setValues({
            ...values,
            error: false,
            [key]: e.target.value
        });
    };
    const clickSubmit = (e) => {
        e.preventDefault();
        let user = {
            name,
            email,
            password
        };
        updateProfile(props.match.params.userId, token, user).then((data) => {
            if (data.error) {
                setValues({
                    ...values,
                    error: true
                });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    const profileUpdate = (name, email, password) => (
        <form className="row ml-4">
            <div className="form-group col-8">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={handleChange('name')}
                    className="form-control"
                    value={name}/>
            </div>
            <div className="form-group col-8">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control"
                    value={email}/>
            </div>
            <div className="form-group col-8">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    onChange={handleChange('password')}
                    className="form-control"
                    value={password}/>
            </div>
            <button className="btn btn-primary col-6 ml-3" onClick={clickSubmit}>Submit</button>
        </form>
    );
    const redirectUser = (success) => {
        if (success) {
            return < Redirect to = "/" />
    }
};

return (
    <Layout
        title="Profile"
        description="Update Your Profile"
        className="container-fluid">
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
    </Layout>
);
};

export default Profile;
