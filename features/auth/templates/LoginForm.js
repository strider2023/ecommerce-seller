import Link from 'next/link';
import React from 'react';
import styles from './styles/LoginForm.module.scss';

function LoginForm(props) {
    return (
        <>
            <form className="form-container" onSubmit={props.onHandleSubmit} autoComplete="off">
                <label>Email ID</label>
                <input name="email" placeholder="Enter your email" type={'email'} className="input-items" onChange={props.onInputChange} required value={props.formData.email}/>
                <label>Password</label>
                <input name="pwd" placeholder="Enter your password" type={'password'} className="input-items" onChange={props.onInputChange} required value={props.formData.pwd}/>
                <button className="app-button">Login</button>
            </form>

            <Link href="/forgot" passHref>
                <p className={styles.navLink}>{'Forgot Password'}</p>
            </Link>

            <div className={styles.altTextContainer}>
                <hr className={styles.divider} />
                <p className={styles.alternativeHeading}>{'or register here'}</p>
                <hr className={styles.divider} />
            </div>

            <Link href="/register" passHref>
                <button className="app-button">
                    Sign Up
                </button>
            </Link>
        </>
    )
}

export default LoginForm