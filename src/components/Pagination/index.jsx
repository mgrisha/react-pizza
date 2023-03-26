import React from "react";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import styles from './Pagination.module.scss';

const CustomPagination = ({ countPages, currentPage, handleChangePage }) => {
    return (
        <div className={styles.root}>
            <Pagination count={countPages} page={currentPage} color="primary" onChange={handleChangePage} variant="outlined" size="large" />
        </div>
    );
}

export default CustomPagination;