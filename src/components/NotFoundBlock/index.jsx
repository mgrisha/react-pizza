import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFound = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span>
                <br />
                404 - нічого не знайдено :(
            </h1>
            <p className={styles.description}>На жаль такої сторінки не існує в нашому інтернет магазині</p>
        </div>
    );
}

export default NotFound;