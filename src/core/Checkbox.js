import React, {useState, useEffect} from 'react';

const Checkbox = ({categories, handleFilters}) => {
    const [checked,
        setChecked] = useState([]);

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId,1);
        }
        // console.log(newCheckedCategoryId,"new");
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    return categories && categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                value={checked.indexOf(c._id === -1)}
                onChange={handleToggle(c._id)}
                type="checkbox"
                className="form-check-input"/>
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
};

export default Checkbox;
