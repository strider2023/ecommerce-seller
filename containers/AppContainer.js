import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AppHeader from '../common/components/AppHeader';
import styles from './styles/AppContainer.module.scss';
import { ADMIN_HEADER, INFLUENCERS_HEADER, STYLISTS_HEADER, SUPPLIER_HEADER } from '../constants/App.constants';
import { useRouter } from 'next/router';
import CommonHead from '../common/components/CommonHead';
import cookieCutter from 'cookie-cutter';

function AppContainer(props) {
    const router = useRouter();
    const [pageDate, setPageData] = useState({ name: props.name, description: props.description });
    const [navData, setNavData] = useState([]);

    useEffect(() => {
        switch (cookieCutter.get('user_role') || '') {
            case 'admin':
                setNavData(ADMIN_HEADER);
                break;
            case 'influencer':
                setNavData(INFLUENCERS_HEADER);
                break;
            case 'styylist':
                setNavData(STYLISTS_HEADER);
                break;
            default:
                setNavData(SUPPLIER_HEADER);
                break;

        }
        for (const data of navData) {
            if (router.pathname === data.link) {
                setPageData(data);
            }
        };
    }, []);

    return (
        <div className={styles.sellerContainer}>
            <CommonHead title={"Surplusss - " + pageDate.name} description={pageDate.description} />
            <AppHeader showBack={props.showBack || false} navData={navData}></AppHeader>
            <Container maxWidth="lg">
                <main className={styles.pageContent}>
                    {pageDate.name && <h1 className={styles.header}>{pageDate.name}<span style={{ color: '#E2D939' }}>*</span></h1>}
                    {pageDate.description && <h2 className={styles.subHeader}>{pageDate.description}</h2>}
                    {props.children}
                </main>
            </Container>
        </div>
    )
}

export default AppContainer