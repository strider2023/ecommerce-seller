import { IconButton } from '@mui/material';
import React from 'react';
import styles from './styles/AddProductImages.module.scss';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DragDropFile from '../../../common/components/DragDropFile';

function AddProductImages(props) {
    const fileTypes = ["image/png", "image/jpeg", "image/jpg"];

    const handleFileChange = (files) => {
        // console.log(files);
        const assets = [...props.productData.imageUrl, ...files]
        props.setProductData((prev) => ({
            ...prev,
            imageUrl: assets
        }));
    };

    const removeImage = (e, index) => {
        e.preventDefault();
        let assets = [...props.productData.imageUrl];
        assets.splice(index, 1);
        props.setProductData((prev) => ({
            ...prev,
            imageUrl: assets
        }));
    }

    return (
        <div className={styles.productImagesContainer}>
            <DragDropFile handleFiles={handleFileChange} types={fileTypes} />
            <div className={styles.collectionItems}>
                {
                    props.productData.imageUrl.map((item, index) => (
                        <div className={styles.collectionItemSelected} key={index}>
                            <img src={typeof item === 'string' ? item : URL.createObjectURL(item)} alt={item.name} />
                            <IconButton className={styles.deleteIcon} onClick={(e) => removeImage(e, index)}>
                                <DeleteRoundedIcon />
                            </IconButton>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AddProductImages