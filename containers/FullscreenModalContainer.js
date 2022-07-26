import { AppBar, Dialog, IconButton, Slide, Toolbar } from '@mui/material';
import React from 'react'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import styles from './styles/ModalContainer.module.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenModalContainer(props) {
    return (
        <Dialog fullScreen open={props.open} onClose={props.handleClose}
            TransitionComponent={Transition}
            className={`${styles.partialModalDialog} ${props.isPartial ? styles.partial : ''}`}>
            <AppBar className={styles.appBar}>
                <Toolbar>
                    <h6 className={styles.title}>
                        {props.title}
                    </h6>
                    <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                        <ClearRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={styles.modalContainer}>
                {props.children}
            </div>
        </Dialog>
    )
}

export default FullScreenModalContainer
