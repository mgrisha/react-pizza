import React from 'react';

import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
    const handleChangeInput = (event) => {
        setSearchValue(event.target.value);
    }

    const clearInput = () => {
        setSearchValue('');
    }

    return (
        <div className={styles.root}>
            <input className={styles.input} placeholder="Пошук піц..." onChange={handleChangeInput} value={searchValue} />
            <img className={`${styles.icon} ${styles['icon-search']}`} src="./assets/img/search.svg" alt="search logo"/>
            {searchValue.length > 0 && (<img className={`${styles.icon} ${styles['icon-clear']}`} src="./assets/img/clear.svg" onClick={clearInput} alt="clear logo"/>)}
        </div>
    );
};

export default Search;