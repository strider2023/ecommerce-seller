import React from 'react';
import styles from './styles/LoginForm.module.scss';
import Link from 'next/link';

function ForgotPasswordForm(props) {
    return (
        <>
            <form className="form-container" onSubmit={props.onHandleSubmit} autoComplete="off">
                <label>{"Email ID"}</label>
                <input name="email" placeholder="Enter your email" type={'email'} className="input-items" onChange={props.onInputChange} required value={props.formData.email}/>
                <button className="app-button">Retrieve Password</button>
            </form>

            <Link href="/" passHref>
                <p className={styles.navLink}>{'Back to Login'}</p>
            </Link>
        </>
    )
}

export default ForgotPasswordForm