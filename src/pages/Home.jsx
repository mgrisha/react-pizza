import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import ProductBlock from "../components/ProductBlock";
import CustomPagination from '../components/Pagination';
import { setCategoryId, setCurrentPage, setSortTypes, setFilters } from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';

function Home() {
    const categoryId = useSelector((state) => state.filterSlice.categoryId);
    const sort = useSelector((state) => state.filterSlice.sort);
    const currentPage = useSelector(state => state.filterSlice.currentPage);
    const searchValue = useSelector(state => state.searchSlice.searchValue);
    const order = useSelector(state => state.filterSlice.order);
    const sortTypes = useSelector(state => state.filterSlice.sortTypes);
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSorts, setIsLoadingSorts] = useState(false);
    const [countPages, setCountPages] = useState(0);

    useEffect(() => {
        const fetchSortTypes = async () => {
            await axios.get('http://apiserver/sorts').then(res => {
                dispatch(setSortTypes(res.data));
                setIsLoadingSorts(true);
            });
        }
        fetchSortTypes();
    }, [dispatch]);

    console.log(items);

    const fetchPizzas = useCallback(async () => {
        setIsLoading(true);

        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const order = (sortTypes.length > 0 && sortTypes[sort].sort.includes('-')) ? 'asc' : 'desc';
        const sortBy = sortTypes.length > 0 ? sortTypes[sort].sort.replace('-', '') : 'rating';
        const search = searchValue ? `&search=${searchValue}` : '';

        await axios
            .get(`http://apiserver/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                setItems(res.data['pizzas']);
                setCountPages(res.data['countPages']);
                setIsLoading(false);
            });
    }, [categoryId, currentPage, searchValue, sort, sortTypes]);

    // const fetchPizzas = () => {
    //     setIsLoading(true);

    //     const category = categoryId > 0 ? `&category=${categoryId}` : '';
    //     const order = (sortTypes.length > 0 && sortTypes[sort].sort.includes('-')) ? 'asc' : 'desc';
    //     const sortBy = sortTypes.length > 0 ? sortTypes[sort].sort.replace('-', '') : 'rating';
    //     const search = searchValue ? `&search=${searchValue}` : '';

    //     axios
    //         .get(`http://apiserver/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
    //         .then((res) =>{
    //             setItems(res.data['pizzas']);
    //             setCountPages(res.data['countPages']);
    //             setIsLoading(false);
    //         });
    // }

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sortBy = sortTypes.length > 0 ? sortTypes.findIndex((obj) => obj.sort === params.sortBy) : 0;
            dispatch(setFilters({
                ...params,
                sortBy
            }));
            isSearch.current = true;
        }
    }, [sortTypes, dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
    }, [fetchPizzas]);

    useEffect(() => {
        if (isMounted.current) {
            const sortBy = sortTypes.length > 0 ? sortTypes[sort].sort.replace('-', '') : 'rating';
            const queryString = qs.stringify({
                sortBy,
                category: categoryId,
                order,
                currentPage
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, currentPage, sort, order, navigate]);

    const handleChangePage = (event, value) => {
        dispatch(setCurrentPage(value));
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategory={(id) => dispatch(setCategoryId(id))} />
                {isLoadingSorts && <Sort sortTypes={sortTypes} />}
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
                {
                    isLoading ? 'Загрузка...' :
                        items.map((pizza) => (
                            <ProductBlock {...pizza} key={pizza.pizzaID} />
                        ))
                }
            </div>
            {(items.length > 0 && countPages > 1) && <CustomPagination countPages={countPages} currentPage={currentPage} handleChangePage={handleChangePage} />}
        </div>
    );
}

export default Home;