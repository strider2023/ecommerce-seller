import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import cookieCutter from 'cookie-cutter';
import Notiflix from 'notiflix';

const UPDATE_BANK_DETAILS = gql`
mutation ($accountHolderName: String!, $acctNo: String!, $accountType: String!, $ifscCode: String!, $bankName: String!) { 
    saveSupplierBankingInfo(input: { accountHolderName: $accountHolderName, acctNo: $acctNo, accountType: $accountType, ifscCode: $ifscCode, bankName: $bankName }) { 
        code, msg 
  } 
}
`;

function BankingInformation(props) {
    const [data, setData] = useState({
        acctNo: props.acctNo || "",
        accountHolderName: props.accountHolderName || "",
        accountType: props.accountType || "",
        ifscCode: props.ifscCode || "",
        bankName: props.bankName || ""
    });

    const [saveSupplierBankingInfo] = useMutation(UPDATE_BANK_DETAILS, {
        onCompleted: (res) => {
            Notiflix.Notify.success('Bank details updated successfully.', { position: "left-bottom", });
        },
        onError: () => {
            Notiflix.Notify.failure('Something went wrong. Please try again.', { position: "left-bottom", });
        },
        context: {
            headers: {
                "uuid": cookieCutter.get('auth_token')
            }
        }
    });

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
        e.preventDefault();
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        saveSupplierBankingInfo({ variables: { ...data } });
    }

    return (
        <form onSubmit={onHandleSubmit} autoComplete="off">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p className="section-headers">Banking Information</p>
                    <p className="section-sub-headers">This is where your payment would go into.</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="bankName" label="Bank Name" fullWidth onChange={onInputChange} value={data.bankName} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="ifscCode" label="IFSC" fullWidth onChange={onInputChange} value={data.ifscCode} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="acctNo" label="Account Number" fullWidth onChange={onInputChange} value={data.acctNo} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="accountHolderName" label="Account Holder Name" fullWidth onChange={onInputChange} value={data.accountHolderName} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="account-type-label">Account Type</InputLabel>
                        <Select
                            labelId="account-type-label"
                            name="accountType"
                            value={data.accountType}
                            label="Account Type"
                            onChange={onInputChange}>
                            <MenuItem value={"checking"}>{"Checking/Current"}</MenuItem>
                            <MenuItem value={"savings"}>{"Savings"}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <button className="app-button">Save</button>
                </Grid>
            </Grid>
        </form>
    )
}

export default BankingInformation