import React, { useState } from 'react'
import CommonHead from '../common/components/CommonHead';
import AuthContainer from '../containers/AuthContainer'
import RegistrationForm from '../features/auth/templates/RegistrationForm'
import { gql, useMutation } from '@apollo/client';
import Notiflix from 'notiflix';

const REGISTER = gql`
mutation ($contactName: String!, $contactEmail: String!, $adminContactEmail: String!, $contactPh: String!, $storeName: String!, $storeAddr: String!, $storeUrl: String! $storeTaxId: String!, $contactPwd: String!, $contactRePwd: String!) { 
    registerSupplier(input: { contactName: $contactName, contactEmail: $contactEmail, adminContactEmail: $adminContactEmail, contactPh: $contactPh, storeName: $storeName, storeAddr: $storeAddr, storeUrl: $storeUrl, storeTaxId: $storeTaxId, contactPwd: $contactPwd, contactRePwd: $contactRePwd }) { 
        code, msg
  } 
}
`;

function Registration() {
    const [formData, setFormData] = useState({ contactName: '', contactEmail: '', adminContactEmail: '', contactPh: '', storeName: '', storeAddr: '', storeTaxId: '', storeUrl: '', contactPwd: '', contactRePwd: '' });

    const [registerSupplier] = useMutation(REGISTER, {
        onCompleted: (data) => {
            console.log(data.registerSupplier);
            Notiflix.Report.success( 'Lehlah Registration', 'Thanks for registering to become a seller. Our sales team will verify your information and email you once the account is created.', 'Okay');
        },
        onError: () => {
            Notiflix.Report.failure( 'Lehlah Registration', 'Something went wrong. Please try again.', 'Okay');
        }
    });

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onHandleSubmit = (e) => {
        console.log(formData);
        e.preventDefault();
        registerSupplier({ variables: { ...formData } })
    }

    return (
        <>
            <CommonHead title="Lehlah - Seller Registration" />
            <AuthContainer {...{
                header: 'Hi',
                subHeader: 'Tell us a bit about yourself',
                showIcon: true
            }}>
                <RegistrationForm {...{ onHandleSubmit, onInputChange, formData }} />
            </AuthContainer>
        </>
    )
}

export default Registration