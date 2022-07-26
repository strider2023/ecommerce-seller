import React from 'react';
import styles from './styles/SessionExpired.module.scss';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

function ServerError() {
    const router = useRouter();

    const handleBack = (e) => {
        router.reload();
    }

    return (
        <div className={styles.brokenPage}>
            <img src={"../images/corrupted-file.png"} className={styles.title} />
            <p>{'Ooh snap. Server is not responding please refresh page or try again later.'}</p>
            <Button onClick={handleBack} className={styles.appButton}>Refresh Page</Button>
        </div>
    )
}

export default ServerError