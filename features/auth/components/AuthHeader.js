import React from 'react';
import styles from './styles/AuthHeader.module.scss'

function AuthHeader(props) {
    return (
        <div className={styles.headerBlock}>
            <h1 className={styles.header}>{props.header}
                {props.showIcon && <span style={{ color: '#E2D939' }}>*</span>}
            </h1>
            <h2 className={styles.subHeader}>{props.subHeader}</h2>
            {props.hint && <p className={styles.hint}>{props.hint}</p>}
        </div>
    )
}

export default AuthHeader