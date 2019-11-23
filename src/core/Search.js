import React, {useState, useEffect} from 'react';
import {getCategories} from '../admin/apiAdmin';
import Card from './Card';

const Search = () => {

    const [data,
        setData] = useState({categories: [], category: '', search: '', results: '', searched: ''});

    const {categories, category, search, results, searched} = data;

    const loadCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({
                    ...data,
                    categories: data.categories
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    };
    useEffect(() => {
        loadCategories();
    }, []);

    const searchSubmit = () => {
        //
    };
    const handleSubmit = () => {
        //
    };
    const handleChange = () => {
        //
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className=" btn mr-2" onChange={handleChange('category')}>
                            <option value="All">Pick Category</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        className="form-control"
                        onChange={handleChange("search")}
                        type="search"
                        placeholder="Search By Name"/>
                </div>
                <div
                    className="btn input-group-append"
                    style={{
                    border: 'none'
                }}>
                    <button className="input-group-text btn btn-primary">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
            </div>
        </div>

    );
};

export default Search;
