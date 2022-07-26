import React from 'react';
import styles from './styles/AuthContainer.module.scss';
import { Container, Hidden } from '@mui/material';
import AuthHeader from '../features/auth/components/AuthHeader';

function AuthContainer(props) {
    return (
        <div className={styles.authContainer}>
            <Container maxWidth="sm">
                <main className={styles.main}>
                    <AuthHeader {...props} />
                    {props.children}
                </main>
            </Container>
            <Hidden mdDown>
                <div className={styles.authLogo}>
                    <img src={"../images/star_icon_top.svg"} className={styles.topRight} />
                    <img src={"../images/star_icon_bottom.svg"} className={styles.bottomLeft} />
                    <img src={"../images/logo.svg"} className={styles.logo} />
                </div>
            </Hidden>
        </div>
    )
}

export default AuthContainer