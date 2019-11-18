import React, {useState} from 'react'
import Layout from '../core/Layout'
import {API} from '../config';

const Signup = () => {

    const [values,
        setValues] = useState({name: '', email: '', password: '', error: '', success: false});

    const handleChange = key => event => {
        setValues({
            ...values,
            error: false,
            [key]: event.target.value
        })
    }

    const {name, email, password} = values;

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} className="form-control" type="text"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} className="form-control" type="email"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange('password')}
                    className="form-control"
                    type="password"/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const signup = user => {
        // console.log(name," ", email, " ", password);
        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json()
        }).catch(err=>{
            console.log(err)
        })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        signup({name, email, password});
    }
    return (
        <Layout
            title="Sign Up"
            description="Sign Up to Ecommerce Node.js"
            className="container col-md-8 offset-md-2">
            {signUpForm()}
        </Layout>
    )
}

export default Signup
