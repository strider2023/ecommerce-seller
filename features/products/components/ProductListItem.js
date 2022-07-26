import { Chip, Fab } from '@mui/material';
import React from 'react';
import styles from './styles/ProductListItem.module.scss';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
import Notiflix from 'notiflix';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';

const DELETE_PRODUCT = gql`
mutation ($productId: String!) { 
  deleteProduct(input: { productId:  $productId }) { 
    code, msg 
  } 
}
`;

function ProductListItem(props) {
    const router = useRouter();

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        onCompleted: (data) => {
            router.reload();
            Notiflix.Notify.success('Product removed successfully.', { position: "left-bottom", });
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

    const removeProduct = (e) => {
        e.preventDefault();
        Notiflix.Confirm.show('Confirm', 'Are you sure you want to delete this product?',
            'Yes', 'No',
            () => {
                deleteProduct({ variables: { productId: props.id.toString() } });
            }, () => { }, {},
        );
    }

    return (
        <div className={styles.product}>
            <div className={styles.productHeaderContainer}>
                <div className={styles.productSubHeaderContainer}>
                    {props.showAdditionalHeaders &&
                        <>
                            <p>Shared #<span>{props.influencerName}</span></p>
                            <p>Commission <span>{props.influencerCommission}</span></p>
                        </>
                    }
                </div>
                <Chip label={props.status === 'active' ? 'Published' : 'Unpublished'} className={props.status === 'active' ? styles.published : styles.unpublished} />
            </div>
            <img src={props.imageUrl} alt={props.name} className={styles.productImage} />
            <div className={styles.productDecriptionContainer}>
                <h1>
                    {props.name}
                </h1>
                <h2>
                    {props.price}
                </h2>
                <div className={styles.productButtonContainer}>
                    <Fab variant="extended" color="primary" className={styles.productButton} size="small" onClick={(e) => props.onPublishProduct(e, props.name, props.id, props.status === 'active' ? false : true)}>
                        {props.status === 'active' ? 'Unpublish' : 'Publish'}
                    </Fab>
                    <Link href={"/product/creator?productId=" + props.id} passHref>
                        <Fab color="primary" className={styles.productButton} size="small" style={{ background: 'green' }}>
                            <ModeEditOutlineRoundedIcon />
                        </Fab>
                    </Link>
                    <Fab color="error" className={styles.productButton} size="small" style={{ background: '#b00020' }} onClick={removeProduct}>
                        <DeleteRoundedIcon />
                    </Fab>
                </div>
            </div>
        </div>
    )
}

export default ProductListItem