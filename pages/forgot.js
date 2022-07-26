import React, { useEffect, useState } from 'react'
import CommonHead from '../common/components/CommonHead';
import AuthContainer from '../containers/AuthContainer'
import ForgotPasswordForm from '../features/auth/templates/ForgotPasswordForm';
import { gql, useMutation } from '@apollo/client';
import Notiflix from 'notiflix';

const FORGOT_PASSWORD = gql`
mutation ($email: String!) { 
  supplierForgotPassInit(input: { email: $email }) { 
    code, msg 
  } 
}
`;

function ForgotPassword() {
    const [formData, setFormData] = useState({ email: '' });
    const [supplierLogin, { loading, error, data }] = useMutation(FORGOT_PASSWORD);

    useEffect(() => {
        if (data) {
            console.log(data.supplierForgotPassInit);
            Notiflix.Loading.remove();
            Notiflix.Notify.success(data.supplierForgotPassInit.msg, { position: "left-bottom", });
        }
    }, [data]);

    if (loading) {
        Notiflix.Loading.hourglass();
    }

    if (error) {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure('Something went wrong. Please try again.', { position: "left-bottom", });
        reset();
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onHandleSubmit = (e) => {
        console.log(formData);
        supplierLogin({ variables: { ...formData } });
        e.preventDefault();
    }

    return (
        <>
            <CommonHead title="Lehlah - Forgot Password" />
            <AuthContainer {...{
                header: 'Welcome',
                subHeader: 'Forgot Your Password?',
                hint: 'Please provide your registered email',
                showIcon: true
            }}>
                <ForgotPasswordForm {...{ onHandleSubmit, onInputChange, formData }} />
            </AuthContainer>
        </>
    )
}

export default ForgotPassword