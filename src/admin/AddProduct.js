import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
// import {Link} from 'react-router-dom';
import {createProduct, getCategories} from '../admin/apiAdmin';

const AddProduct = () => {

    const [values,
        setValues] = useState({
        name: '',
        description: '',
        price: 0,
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                });
            } else {
                setValues({
                    ...values,
                    categories: data.categories,
                    formData: new FormData()
                });
            }
        });
    };
    useEffect(() => {
        // setValues({     ...values,     formData: new FormData() });
        init();
    }, []);
    const handleChange = name => (e) => {
        const value = name === 'photo'
            ? e.target.files[0]
            : e.target.value;

        formData.set(name, value);
        setValues({
            ...values,
            error:'',
            [name]: value
        });
    };
    const {user, token} = isAuthenticated();
    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            error: '',
            loading: true
        });
        createProduct(user._id, token, formData).then(data => {
            console.log(data," daat ");
            if (data.err) {
                setValues({
                    ...values,
                    error: data.err,
                    loading: false,
                    createdProduct:''
                });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    quantity: '',
                    price: '',
                    photo: '',
                    category:'',
                    error: false,
                    formData: new FormData(),
                    createdProduct: data.product.name,
                    loading: false
                });
                console.log(formData,"form");
            }
        });
    };
    const showError = () => {
        return (
            <div
                className="alert alert-danger"
                style={{
                display: error
                    ? ''
                    : 'none'
            }}>{error}</div>
        );
    };
    const showSucess = () => {
        return (
            <div
                className="alert alert-info"
                style={{
                display: createdProduct
                    ? ''
                    : 'none'
            }}>
                <h2>
                    {`${createdProduct} is created!!`}
                </h2>
            </div>
        );
    };
    const showLoading = () => ((loading && (
        <div className="alert alert-success">
            <h2>Loading...</h2>
        </div>
    )));
    const newProductAddForm = () => {
        return (
            <form className="mb-3" onSubmit={clickSubmit}>
                <h4>Post Photo</h4>
                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input
                            onChange={handleChange('photo')}
                            type="file"
                            name="photo"
                            accept="image/*"/>
                    </label>
                </div>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        value={name}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea
                        onChange={handleChange('description')}
                        type="text"
                        className="form-control"
                        value={description}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input
                        onChange={handleChange('price')}
                        type="number"
                        className="form-control"
                        value={price}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Category</label>
                    <select onChange={handleChange('category')} className="form-control">
                        <option>Please select any one category</option>
                        {categories && categories.map((c, i) => (
                            <option key={i} value={c._id}>{c.name}</option>
                        ))}
                        <option value="5dd4e4814892d246b0401687">phone</option>
                        <option value="5dd4e4814892d246b0401687">adding</option>
                    </select>

                </div>
                <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input
                        onChange={handleChange('quantity')}
                        type="number"
                        className="form-control"
                        value={quantity}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Shipping</label>
                    <select onChange={handleChange('shipping')} className="form-control">
                        <option>Please select any one option</option>
                        <option value="0">NO</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <button className="btn btn-outline-primary">Create Product</button>
            </form>
        );
    };
    return (
        <Layout
            title="Add a new product"
            description={`Hello, ${user.name}!Want to add new product`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showLoading()}
                    {showSucess()}
                    {newProductAddForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct
