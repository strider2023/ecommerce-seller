import React, { useState } from 'react';
import styles from './styles/OTPInput.module.scss'

function OTPInput() {
    const [otp, setOtp] = useState({ value: '', otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: "", disable: true });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOtp((prev) => ({ 
            ...prev,
            [name]: value
        }));
    }

    const inputfocus = (elmnt) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = elmnt.target.tabIndex - 2;
            if (next > -1) {

                elmnt.target.form.elements[next].focus()
            }
        }
        else {
            console.log("next");
            const next = elmnt.target.tabIndex;
            if (next < 6) {
                elmnt.target.form.elements[next].focus()
            }
        }

    }

    return (
        <div className={styles.otpContainer}>
            <input
                name="otp1"
                type="text"
                autoComplete="off"
                className={styles.otpInput}
                value={otp.otp1}
                onChange={handleChange}
                tabIndex="1" maxLength="1" onKeyUp={inputfocus}
            />
            <input
                name="otp2"
                type="text"
                autoComplete="off"
                className={styles.otpInput}
                value={otp.otp2}
                onChange={handleChange}
                tabIndex="2" maxLength="1" onKeyUp={inputfocus}
            />
            <input
                name="otp3"
                type="text"
                autoComplete="off"
                className={styles.otpInput}
                value={otp.otp3}
                onChange={handleChange}
                tabIndex="3" maxLength="1" onKeyUp={inputfocus}
            />
            <input
                name="otp4"
                type="text"
                autoComplete="off"
                className={styles.otpInput}
                value={otp.otp4}
                onChange={handleChange}
                tabIndex="4" maxLength="1" onKeyUp={inputfocus}
            />

            <input
                name="otp5"
                type="text"
                autoComplete="off"
                className={styles.otpInput}
                value={otp.otp5}
                onChange={handleChange}
                tabIndex="5" maxLength="1" onKeyUp={inputfocus}
            />

            <input
                name="otp6"
                type="text"
                autoComplete="off"
                className={styles.otpInput}
                value={otp.otp6}
                onChange={handleChange}
                tabIndex="6" maxLength="1" onKeyUp={inputfocus}
            />
        </div>
    );

}

export default OTPInput