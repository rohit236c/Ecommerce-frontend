import React, {useState, useEffect} from 'react';
import {getCategories} from '../admin/apiAdmin';
import {list} from './coreApi';
import Card from './Card';

const Search = () => {

    const [data,
        setData] = useState({categories: [], category: '', search: '', results: [], searched: ''});

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

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };

    const searchData = () => {
        if (search) {
            list({
                search: search || undefined,
                category: category
            }).then((response) => {
                if (response.error) {
                    console.log(response.error);
                }
                setData({
                    ...data,
                    results: response,
                    searched: true
                });
            }).catch(err => console.log(err));
        }
    };
    const handleChange = name => (event) => {
        setData({
            ...data,
            [name]: event.target.value,
            searched: false
        });

    };
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className=" btn mr-2" onChange={handleChange('category')}>
                            <option value="All">Pick Category</option>
                            {categories && categories.map((c, i) => (
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
    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return `Found ${results.length} products!!`
        }
        if(searched && results.length < 1) {
            return `No Products found!`
        }
    };
    const searchedProducts = (results = []) => (
        <div>
            <h2 className="mt-4 mb-4">
                {searchMessage(searched, results)}
            </h2>
            <div className="row">
                {results.map((r, i) => (< Card key = {
                    i
                }
                product = {
                    r
                } />))}
            </div>
        </div>
    );

    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
            </div>
            <div className="container-fluid">
                {searchedProducts(results)}
            </div>
        </div>

    );
};

export default Search;
