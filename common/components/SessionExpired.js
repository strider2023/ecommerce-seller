import React from 'react';
import styles from './styles/SessionExpired.module.scss';
import Link from 'next/link';

function SessionExpired() {
    return (
        <div className={styles.sessionExpiredContainer}>
            <img src={"../images/star_icon_top.svg"} className={styles.topRight} />
            <img src={"../images/star_icon_bottom.svg"} className={styles.bottomLeft} />
            <img src={"../images/logo.svg"} className={styles.logo} />
            <p>Your session has expired please login again.</p>
            <Link href="/" passHref>
                <button className={styles.appButton}>Back to Login</button>
            </Link>
        </div>
    )
}

export default SessionExpired