import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getCategories} from '../admin/apiAdmin';
import {getFilteredProducts} from './coreApi';
import Checkbox from './Checkbox';
import Card from './Card';
import {prices} from './fixedPrices';
import Radiobox from './Radiobox';

const Shop = () => {

    const [Filters,
        setFilters] = useState({
        filters: {
            categories: [],
            price: []
        }
    });
    const [categories,
        setCategories] = useState([]);
    const [error,
        setError] = useState(false);
    const [limit,
        setLimit] = useState(6);
    const [skip,
        setSkip] = useState(0);
    const [filteredResults,
        setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data.categories);
            }
        });
    };

    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
            }
        }).catch(err => {
            setError("server is down!!");
        });
    };

    const handleFilters = (filters, filterBy) => {
        // console.log(filterBy, " ", filters);
        const newFilters = {
            ...Filters
        };
        newFilters.filters[filterBy] = filters;
        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(newFilters.filters);
        setFilters(newFilters);
    };
    const handlePrice = (value) => {
        const data = prices;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };
    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, Filters.filters);
    }, []);

    return (
        <Layout
            title="Shop Page"
            description="Search Products"
            className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>Filter By Category</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters => handleFilters(filters, 'categories')}/>
                    </ul>
                    <h4>Filter By Price Range</h4>
                    <div>
                        <Radiobox
                            prices={prices}
                            handleFilters={filters => handleFilters(filters, 'price')}/>
                    </div>
                </div>
                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((p, i) => (<Card key={i} product={p}/>))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
