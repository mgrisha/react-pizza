import React, { useState, useEffect } from 'react';

function Categories({ categoryId, onChangeCategory }) {
    // const [activeCategory, setActiveCategory] = useState(1);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://apiserver/categories').then((res) => res.json()).then((arr) => {
            setCategories(arr);
        });
    }, [])

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value) => (
                        <li key={value.id} className={Number(categoryId) === Number(value.id) ? 'active' : ''} onClick={() => onChangeCategory(value.id)}>{value.name}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Categories;