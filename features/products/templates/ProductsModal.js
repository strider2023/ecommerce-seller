import { Container, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, InputBase, Paper, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FullScreenModalContainer from '../../../containers/FullscreenModalContainer';
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles/ProductsModal.module.scss';
import { gql, useLazyQuery } from '@apollo/client';
import Notiflix from 'notiflix';
import cookieCutter from 'cookie-cutter';

const SEARCH_STORE_DETAILS = gql`
query ($searchText: String!) { 
    getSupplierAllProducts(input: { searchText: $searchText, paginationOffset: "null", size: 100 }) { 
        result {id, name,description,price, groupPrice,imageUrl,outOfStock,status}
  } 
}
`;

function ProductsModal(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState(props.products);
    const [formData, setData] = useState({ searchText: '' });

    const [getSupplierAllProducts] = useLazyQuery(SEARCH_STORE_DETAILS, {
        onCompleted: (res) => {
            console.log(res);
            setProducts(res.getSupplierAllProducts.result);
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

    useEffect(() => {
        let data = []
        for (const p of props.selectedProducts) {
            data.push(p.id);
        }
        setSelectedItems(data);
    }, [props.selectedProducts])

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onItemSelected = (e, id) => {
        let data = [...selectedItems];
        if (data.indexOf(id) === -1) {
            data.push(id);
        } else {
            data.splice(data.indexOf(id), 1);
        }
        setSelectedItems(data);
        e.preventDefault();
    }

    const onSelectionComplete = (e) => {
        e.preventDefault();
        let collectionProducts = []
        for (const p of props.products) {
            if (selectedItems.indexOf(p.id) !== -1) {
                collectionProducts.push(p)
            }
        }
        props.setProducts(collectionProducts);
        props.handleClose();
    }

    const handleOnSearch = (e) => {
        e.preventDefault();
        getSupplierAllProducts({ variables: { searchText: formData.searchText } });
    }

    return (
        <FullScreenModalContainer {...props} title="Products" isPartial={false}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Product"
                                inputProps={{ 'aria-label': 'search product' }}
                                name="searchText"
                                value={formData.searchText || ""} onChange={onInputChange}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleOnSearch}>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <button className="app-button" onClick={onSelectionComplete}>Save Selection</button>
                    </Grid>
                    <Grid item xs={12}>
                        <ImageList rowHeight={200} cols={matches ? 4 : 2} variant="quilted">
                            {
                                products.map((item) => {
                                    return (
                                        <ImageListItem key={item.id} onClick={(e) => onItemSelected(e, item.id)}>
                                            <img src={item.imageUrl} alt={item.name} style={{ cursor: 'pointer' }} className={styles.storeItemImage} loading="lazy" />
                                            <ImageListItemBar
                                                className={`${styles.storeListItemBar} ${selectedItems.indexOf(item.id) === -1 ? '' : styles.selected}`}
                                                title={item.name}
                                                subtitle={<span>{"₹ " + item.price}</span>}
                                            />
                                        </ImageListItem>
                                    );
                                })
                            }
                        </ImageList>
                    </Grid>
                </Grid>
            </Container>
        </FullScreenModalContainer>
    )
}

export default ProductsModal