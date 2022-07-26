import { CircularProgress } from '@mui/material';
import React from 'react'
import styles from './styles/SessionExpired.module.scss';

function Loading() {
    return (
        <div className={styles.sessionExpiredContainer}>
            {/* <Skeleton variant="rect" width={210} height={118} /> */}
            <CircularProgress />
        </div>
    )
}

export default Loading