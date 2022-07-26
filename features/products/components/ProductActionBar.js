import { Fab, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import React from 'react';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import Link from 'next/link';

function ProductActionBar(props) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
                <Link href="/product/creator" passHref>
                    <button className="app-button">
                        Add New Product
                    </button>
                </Link>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Fab variant="extended" color="primary" 
                style={{ background: 'green', width: "100%" }} onClick={(e) => props.onPublish(e, true)}>
                    Publish All
                </Fab>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Fab variant="extended" color="primary" 
                style={{ background: '#b00020', width: "100%" }} onClick={(e) => props.onPublish(e, false)}>
                    Unpublish All
                </Fab>
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">Search Products</InputLabel>
                    <OutlinedInput
                        name="search"
                        value={props.filterData.search}
                        onChange={props.onInputChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={props.onSearch}
                                    edge="end">
                                    <ManageSearchRoundedIcon style={{ color: 'black' }} />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Search Products"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                    <Select
                        name="status"
                        value={props.filterData.status}
                        onChange={props.onInputChange}>
                        <MenuItem value={"all"}>
                            <em>All Products</em>
                        </MenuItem>
                        <MenuItem value={"published"}>{"Published"}</MenuItem>
                        <MenuItem value={"unpublished"}>{"UnPublished"}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default ProductActionBar