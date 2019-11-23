import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin';

const AddCategories = () => {

    const [name,
        setName] = useState('');
        const [printName,
            setPrintName] = useState('');
    const [error,
        setError] = useState(false);
    const [success,
        setSuccess] = useState(false);
    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    }
    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // call to api to create api
        createCategory(user._id, token, {name}).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setPrintName(name);
                setName('');
                setError('');
                setSuccess(true);
            }
        });
    };
    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{printName} category is created
            </h3>
        }
    };
    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category already exist!!!</h3>
        }
    };
    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
            </div>
        );
    };
    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    className="form-control"
                    type="text"
                    value={name}
                    autoFocus
                    onChange={handleChange}/>
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );
    return (
        <Layout title="Add Category" description={`Hello, ${user.name}!`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategories;
