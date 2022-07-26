import React from 'react';
import styles from './styles/SessionExpired.module.scss';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

function Unauthorised() {
    const router = useRouter();

    const handleBack = (e) => {
        router.back();
    }

    return (
        <div className={styles.sessionExpiredContainer}>
            <img src={"../images/app_logo.svg"} className={styles.title} />
            <p>{'You don\'t have the required permission to view this page.'}</p>
            <Button onClick={handleBack}>Go Back</Button>
        </div>
    )
}

export default Unauthorised