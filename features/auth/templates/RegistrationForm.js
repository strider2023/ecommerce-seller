import React from 'react';
import styles from './styles/LoginForm.module.scss';
import Link from 'next/link';

function RegistrationForm(props) {
    return (
        <>
            <form className="form-container" onSubmit={props.onHandleSubmit} autoComplete="off">
                <label>Contact Name</label>
                <input name="contactName" placeholder="Contact Name" className="input-items" onChange={props.onInputChange} required value={props.formData.name} />
                <label>Store contact email</label>
                <input name="contactEmail" placeholder="Store contact email" type={'email'} className="input-items" onChange={props.onInputChange} required value={props.formData.store_email} />
                <label>Admin email for payout</label>
                <input name="adminContactEmail" placeholder="Admin email for payout" type={'email'} className="input-items" onChange={props.onInputChange} required value={props.formData.payout_email} />
                <label>Contact phone</label>
                <input name="contactPh" placeholder="Contact phone" type={'tel'} className="input-items" onChange={props.onInputChange} required value={props.formData.phone} />
                <label>Store/Compnay Name</label>
                <input name="storeName" placeholder="Store/Compnay Name" className="input-items" onChange={props.onInputChange} required value={props.formData.company_name} />
                <label>Store/Company Address</label>
                <input name="storeAddr" placeholder="Store/Company Address" className="input-items" onChange={props.onInputChange} required value={props.formData.address} />
                <label>Store/Company Website</label>
                <input name="storeUrl" placeholder="Store/Company Website" type={'url'} className="input-items" onChange={props.onInputChange} required value={props.formData.website_url} />
                <label>GSTIN</label>
                <input name="storeTaxId" placeholder="GSTIN" className="input-items" onChange={props.onInputChange} required value={props.formData.gstin} />
                <label>Password</label>
                <input name="contactPwd" placeholder="Enter your password" type={'password'} className="input-items" onChange={props.onInputChange} required value={props.formData.pwd} />
                <label>Confirm Password</label>
                <input name="contactRePwd" placeholder="Confirm your password" type={'password'} className="input-items" onChange={props.onInputChange} required value={props.formData.confirm_pwd} />
                <button className="app-button">Sign Up</button>
            </form>

            <Link href="/" passHref>
                <p className={styles.navLink}>{'Back to Login'}</p>
            </Link>
        </>
    )
}

export default RegistrationForm