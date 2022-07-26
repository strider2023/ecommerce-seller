import React, { useState } from 'react';
import styles from './styles/ToggleButton.module.scss'

function ToggleButton(props) {
    const [isActive, setIsActive] = useState(false);

    const setInActive = (e) => {
        setIsActive(false);
        if (props.onToggleListener) {
            props.onToggleListener(false);
        }
    }

    const setActive = (e) => {
        setIsActive(true);
        if (props.onToggleListener) {
            props.onToggleListener(true);
        }
    }

    return (
        <div className={styles.buttonContianer}>
            <p className={!isActive ? styles.activeButton : styles.inActiveButton} onClick={setInActive}>{props.inactiveLabel}</p>
            <p className={isActive ? styles.activeButton : styles.inActiveButton} onClick={setActive}>{props.activeLabel}</p>
        </div>
    )
}

export default ToggleButton