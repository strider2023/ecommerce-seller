import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { LanguageContext } from '../providers/LanguageContext';
import styles from './styles/AppHeader.module.scss';
import HideOnScroll from './HideOnScroll';
import Link from 'next/link';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { AppBar, Container, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Tooltip } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import cookieCutter from 'cookie-cutter';
import useAuthState from '../hooks/useAuthState';

function AppHeader(props) {
    const router = useRouter()
    const language = useContext(LanguageContext);
    const [isOpen, setOpen] = useState(false);
    const { removeAuth } = useAuthState();

    const handleBack = (e) => {
        router.back();
    }

    const handleLogout = (e) => {
        cookieCutter.set('auth_token', '', { expires: new Date(0), path: '/'});
        removeAuth();
        router.replace('/');
    }

    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(!isOpen);
    }

    return (
        <>
            <HideOnScroll {...props}>
                <AppBar className={styles.websiteHeaderContainer} elevation={0}>
                    <Container maxWidth="lg">
                        <Toolbar>
                            {props.showBack && <IconButton edge="start" className={styles.menuButton} onClick={handleBack}>
                                <ArrowBackIosRoundedIcon />
                            </IconButton>
                            }
                            <img src={"../images/logo.svg"} className={styles.appLogo} />
                            <div style={{ flexGrow: "1" }}></div>
                            {!props.showBack &&
                                <>
                                    <Hidden smDown>
                                        {props.navData.map((data, index) => (
                                            <Link href={data.link} passHref key={index}>
                                                <Tooltip title={data.name}>
                                                    <IconButton aria-label={data.name} className={router.pathname === data.link.split("?")[0] ? styles.iconButtonSelected : styles.iconButton}>
                                                        {data.icon}
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                        ))}
                                        <IconButton className={styles.iconButton} onClick={handleLogout}>
                                            <LogoutRoundedIcon />
                                        </IconButton>
                                    </Hidden>
                                    <Hidden smUp>
                                        <IconButton className={styles.iconButton} onClick={toggleDrawer}>
                                            <MenuRoundedIcon />
                                        </IconButton>
                                    </Hidden>
                                </>}
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
            {!props.showBack &&
                <>
                    <Hidden smUp>
                        <Drawer anchor="bottom" open={isOpen} onClose={toggleDrawer}>
                            <div className={styles.appDrawer}>
                                <img src={"../images/logo.svg"} className={styles.drawerLogo} />
                                <List>
                                    {props.navData.map((data, index) => (
                                        <Link href={data.link} passHref key={index}>
                                            <ListItem button>
                                                <ListItemIcon className={styles.iconButtonSelected}>{data.icon}</ListItemIcon>
                                                <ListItemText primary={data.name} />
                                            </ListItem>
                                        </Link>
                                    ))}
                                    <ListItem button onClick={handleLogout}>
                                        <ListItemIcon className={styles.iconButtonSelected}><LogoutRoundedIcon /></ListItemIcon>
                                        <ListItemText primary={"Logout"} />
                                    </ListItem>
                                </List>
                            </div>
                        </Drawer>
                    </Hidden>
                </>}
        </>
    )
}

export default AppHeader
