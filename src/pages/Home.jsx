import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import ProductBlock from "../components/ProductBlock";

function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState(0);
    const [sortTypes, setSortTypes] = useState([]);
    const [isLoadingSorts, setIsLoadingSorts] = useState(false);


    useEffect(() => {
        // fetch('http://apiserver/sorts')
        //     .then((res) => res.json())
        //     .then((arr) => {
        //         setSortTypes(arr);
        //         setIsLoadingSorts(true);
        //     });
        async function fetchData2 () {
            await fetch('http://apiserver/sorts')
                .then((res) => res.json())
                .then((arr) => {
                    setSortTypes(arr);
                    setIsLoadingSorts(true);
                });
        }
        fetchData2();
    }, []);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = (sortTypes.length > 0 && sortTypes[sortType].sort.includes('-')) ? 'asc' : 'desc';
    const sortBy = sortTypes.length > 0 ? sortTypes[sortType].sort.replace('-', '') : 'rating';

    useEffect(() => {
        setIsLoading(true);
        // fetch(`http://apiserver/items?${category}&sortBy=${sortBy}&order=${order}`).then((res) => res.json()).then((arr) => {
        //     setItems(arr);
        //     setIsLoading(false);
        // });
        async function fetchData () {
            await fetch(`http://apiserver/items?${category}&sortBy=${sortBy}&order=${order}`).then((res) => res.json()).then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        }
        fetchData();
        window.scrollTo(0, 0);
    }, [category, order, sortBy]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
                {isLoadingSorts && <Sort sortType={sortType} onChangeSort={(id) => setSortType(id)} sortTypes={sortTypes} />}
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? 'Загрузка...' :
                        items.map((pizza) => (
                            <ProductBlock {...pizza} key={pizza.pizzaID} />
                        ))
                }
            </div>
        </div>
    );
}

export default Home;