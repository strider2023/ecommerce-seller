import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import styles from './styles/ProfileDetails.module.scss';
import { gql, useMutation } from '@apollo/client';
import Notiflix from 'notiflix';
import cookieCutter from 'cookie-cutter';
import { toBase64 } from '../../../common/utils/FileUtils'
import DragDropFile from '../../../common/components/DragDropFile';

const UPLOAD_IMAGE = gql`
mutation ($imageData: String!, $imageDataFileName: String!) { 
    saveSupplierBanner(input: { imageData: $imageData, imageDataFileName: $imageDataFileName }) { 
        id, imageUrl 
  } 
}
`;

const DELETE_IMAGE = gql`
mutation ($id: String!) { 
    deleteSupplierBanner(input: { id: $id }) { 
        id, imageUrl 
  } 
}
`;

function Banners(props) {
    const fileTypes = ["image/png", "image/jpeg", "image/jpg"];
    const [dialogData, setData] = useState({ imageUrl: '', file: null });
    const [bannerList, setBannerList] = useState(props.banners);
    const [open, setOpen] = useState(false);
    const [saveSupplierBanner] = useMutation(UPLOAD_IMAGE, {
        onCompleted: (data) => {
            setBannerList(data.saveSupplierBanner);
            handleClose();
            Notiflix.Notify.success('Banner image added successfully.', { position: "left-bottom", });
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

    const [deleteSupplierBanner] = useMutation(DELETE_IMAGE, {
        onCompleted: (data) => {
            setBannerList(data.deleteSupplierBanner);
            Notiflix.Notify.success('Banner image removed successfully.', { position: "left-bottom", });
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

    const onFileUpload = (files) => {
        console.log(files)
        setData((prev) => ({
            ...prev,
            file: files[0]
        }));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSaveFile = async (e) => {
        e.preventDefault();
        saveSupplierBanner({ variables: { imageData: await toBase64(dialogData.file), imageDataFileName: dialogData.file.name } });
    }

    const handleClose = () => {
        setData({ imageUrl: '', file: null });
        setOpen(false);
    };

    const removeBanner = (e, id) => {
        e.preventDefault();
        Notiflix.Confirm.show('Confirm', 'Are you sure you want to delete this banner image?',
            'Yes', 'No',
            () => {
                deleteSupplierBanner({ variables: { id: id.toString() } });
            }, () => { }, {},
        );
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                    <p className="section-headers">Banner Images</p>
                    <p className="section-sub-headers">These are the images for your store front.</p>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <button className="app-button" onClick={handleClickOpen}>Add Banner Image</button>
                </Grid>
                <Grid item xs={12}>
                    {
                        bannerList.map((item) => {
                            return (
                                <div key={item.id} className={styles.bannerList}>
                                    <IconButton onClick={(e) => removeBanner(e, item.id)}>
                                        <DeleteRoundedIcon style={{ color: 'red' }} />
                                    </IconButton>
                                    <img src={item.imageUrl} alt={item.id} />
                                </div>
                            )
                        })
                    }
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Banner Image</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <DialogContentText>
                                These are the images for your store front.
                            </DialogContentText>
                        </Grid>
                        {/* <Grid item xs={12}>
                            {dialogData.file === null && <TextField name="imageUrl" label="Image Url" value={dialogData.imageUrl || ""} onChange={onInputChange} fullWidth required />}
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            {dialogData.file === null && dialogData.imageUrl.length === 0 && <p>OR</p>}
                        </Grid> */}
                        <Grid item xs={12}>
                            {dialogData.imageUrl.length === 0 && <DragDropFile handleFiles={onFileUpload} name="file" types={fileTypes}/>}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveFile} className="app-button">Save Banner Image</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Banners