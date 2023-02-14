import React, { useState, useEffect } from 'react';

function Categories() {
    const [activeCategory, setActiveCategory] = useState(1);
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
                        <li key={value.id} className={activeCategory === Number(value.id) ? 'active' : ''} onClick={() => setActiveCategory(value.id)}>{value.name}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Categories;