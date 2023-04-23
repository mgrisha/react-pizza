import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import ProductBlock from "../components/ProductBlock";
import CustomPagination from '../components/Pagination';
// import { AppContext } from '../App';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import { useSelector, useDispatch } from 'react-redux';

function Home() {
    const categoryId = useSelector((state) => state.filterSlice.categoryId);
    const sort = useSelector((state) => state.filterSlice.sort);
    const currentPage = useSelector(state => state.filterSlice.currentPage);
    const searchValue = useSelector(state => state.searchSlice.searchValue);

    const dispatch = useDispatch();

    // const { searchValue } = useContext(AppContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortTypes, setSortTypes] = useState([]);
    const [isLoadingSorts, setIsLoadingSorts] = useState(false);
    const [countPages, setCountPages] = useState(0);

    useEffect(() => {
        async function fetchData2 () {
            await axios.get('http://apiserver/sorts').then(res => {
                setSortTypes(res.data);
                setIsLoadingSorts(true);
            });
        }
        fetchData2();
    }, []);

    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const order = (sortTypes.length > 0 && sortTypes[sort].sort.includes('-')) ? 'asc' : 'desc';
    const sortBy = sortTypes.length > 0 ? sortTypes[sort].sort.replace('-', '') : 'rating';
    const search = searchValue ? `&search=${searchValue}` : '';

    useEffect(() => {
        setIsLoading(true);
        async function fetchData () {
            await axios
                .get(`http://apiserver/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
                .then((res) =>{
                    setItems(res.data['pizzas']);
                    setCountPages(res.data['countPages']);
                    setIsLoading(false);
                });
        }
        fetchData();
        window.scrollTo(0, 0);
    }, [category, order, sortBy, search, currentPage]);

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