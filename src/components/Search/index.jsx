import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/searchSlice';

import styles from './Search.module.scss';

const Search = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef();

    const handleChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    const clearInput = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current.focus();
    }

    const updateSearchValue = useCallback(
        debounce((string) => {
            dispatch(setSearchValue(string));
        }, 1000),
        []
    );

    return (
        <div className={styles.root}>
            <input
                className={styles.input}
                placeholder="Пошук піц..."
                onChange={handleChangeInput}
                value={value}
                ref={inputRef}
            />
            <img className={`${styles.icon} ${styles['icon-search']}`} src="./assets/img/search.svg" alt="search logo"/>
            {value.length > 0 && (<img className={`${styles.icon} ${styles['icon-clear']}`} src="./assets/img/clear.svg" onClick={clearInput} alt="clear logo"/>)}
        </div>
    );
};

export default Search;