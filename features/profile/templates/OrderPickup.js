import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { gql, useMutation } from '@apollo/client';
import Notiflix from 'notiflix';
import cookieCutter from 'cookie-cutter';

const ADD_ADDRESS = gql`
mutation ($addr: String!, $zip: String!) { 
    saveSupplierPickupAddr(input: { addr: $addr, zip: $zip }) { 
        code, msg 
  } 
}
`;

const DELETE_ADDRESS = gql`
mutation ($id: String!) { 
    deletePickupAddr(input: { id: $id }) { 
        pickupAddr, pickupAddrZip 
  } 
}
`;

function OrderPickup(props) {
    const [data, setData] = useState({});
    const [address, setAddress] = useState(props.pickupAddr);
    const [addressZip, setAddressZip] = useState(props.pickupAddrZip);
    const [open, setOpen] = useState(false);

    const [saveSupplierPickupAddr] = useMutation(ADD_ADDRESS, {
        onCompleted: (res) => {
            setAddress([ ...address, data.addr ]);
            setAddressZip([ ...addressZip, data.zip ]);
            handleClose();
            Notiflix.Notify.success('Pickup address added successfully.', { position: "left-bottom", });
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

    const [deletePickupAddr] = useMutation(DELETE_ADDRESS, {
        onCompleted: (data) => {
            setAddress(data.deletePickupAddr.pickupAddr);
            setAddressZip(data.deletePickupAddr.pickupAddrZip);
            Notiflix.Notify.success('Pickup address removed successfully.', { position: "left-bottom", });
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
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setData({})
        setOpen(false);
    };

    const handleAddAddress = (e) => {
        e.preventDefault();
        saveSupplierPickupAddr({ variables: { addr: data.addr, zip: data.zip } });
    }

    const removeAddress = (e, id) => {
        e.preventDefault();
        Notiflix.Confirm.show('Confirm', 'Are you sure you want to delete this pickup address?',
            'Yes', 'No',
            () => {
                deletePickupAddr({ variables: { id: id.toString() } });
            }, () => { }, {},
        );
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                    <p className="section-headers">Order Pickup</p>
                    <p className="section-sub-headers">The address where the courier agency will pick up your order.</p>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <button className="app-button" onClick={handleClickOpen}>Add Pickup Address</button>
                </Grid>
                <Grid item xs={12}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {
                            address.map((item, index) => {
                                return (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <IconButton onClick={(e) => removeAddress(e, index)}>
                                                <DeleteRoundedIcon style={{ color: 'red' }} />
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemText primary={item} secondary={addressZip[index]} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Pickup Address</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <DialogContentText>
                                The address where the courier agency will pick up your order.
                            </DialogContentText>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="addr" label="Address(Without Pincode/Zipcode)" value={data.addr || ""} onChange={onInputChange} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="zip" label="Pincode/Zipcode" type="number" value={data.zip || ""} fullWidth onChange={onInputChange} required />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddAddress} className="app-button">Save Address</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrderPickup