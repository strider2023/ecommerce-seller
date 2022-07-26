import { Accordion, AccordionDetails, AccordionSummary, Fab, FormControl, Grid, Menu, MenuItem, Select, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import styles from './styles/PriceDiscountsAndVariants.module.scss';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DatePicker from "react-datepicker";

function Shipping(props) {
    console.log(props.productData.shipping)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateShippingInfo = (e, index) => {
        const { name, value } = e.target;
        console.log({ index, name, value });
        let data = [...props.productData.shipping];
        data[index] = [{ ...data[index], [name]: value }];
        console.log(data);
        props.setProductData(prevState => ({
            ...prevState,
            shipping: data
        }));
        e.preventDefault();
    }

    const addShipping = (e, type) => {
        let data = [...props.productData.shipping];
        data.push({ id: props.productData.shipping.length + 1, type: type, name: "", price: 0, free_from: 0 });
        // props.setProductData(data);
        props.setProductData((prev) => ({
            ...prev,
            shipping: data
        }));
        e.preventDefault();
    }

    const removeShipping = (e, index) => {
        let data = [...props.productData.shipping];
        data.splice(index, 1);
        props.setProductData((prev) => ({
            ...prev,
            shipping: data
        }));
        e.preventDefault();
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p className="section-headers">Publish - Make your product Live</p>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div className={styles.dateContainer}>
                        <p>Publish Start Date</p>
                        <DatePicker className={styles.datePicker}
                            selected={typeof props.productData.startTs === 'string' ? new Date(Number(props.productData.startTs)) : props.productData.startTs}
                            onChange={(date) => props.setProductData((prev) => ({ ...prev, startTs: date }))} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div className={styles.dateContainer}>
                        <p>Publish End Date</p>
                        <DatePicker className={styles.datePicker}
                            selected={typeof props.productData.expiresTs === 'string' ? new Date(Number(props.productData.expiresTs)) : props.productData.expiresTs}
                            onChange={(date) => props.setProductData((prev) => ({ ...prev, expiresTs: date }))} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <p className="section-headers">Tags - Add tags to make your product easily searchable</p>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Tags" name="tags" value={props.productData.tags} fullWidth onChange={props.onInputChange} />
                </Grid>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="returns-content" id="returns-header" >
                            <p className={styles.accordionHeader}>Shipping</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={styles.accordionBodyContainer}>
                                {
                                    props.productData.shipping.map((item, index) => (
                                        <div className={styles.accordionBodyItem} key={index}>
                                            <p className={styles.accordionTitle}>{(index + 1) + ". " + (item.type === 'shipping' ? 'Delivery' : 'Pickup')}{item.type}</p>
                                            <div className={styles.accordionFormContent}>
                                                {item.type === 'shipping' &&
                                                    <>
                                                        <FormControl className={styles.accordionFormItem}>
                                                            <Select
                                                                labelId="account-type-label"
                                                                name="name"
                                                                value={item.name}
                                                                onChange={(e) => updateShippingInfo(e, index)}>
                                                                <MenuItem value={"standard free"}>{"Standard Free Shipping"}</MenuItem>
                                                                <MenuItem value={"express shipping"}>{"Express Shipping"}</MenuItem>
                                                                <MenuItem value={"standard"}>{"Standard Shipping"}</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField label="Shipping Cost" name="price" required value={item.price} className={styles.accordionFormItem} onChange={(e) => updateShippingInfo(e, index)} />
                                                        <TextField label="Minimum Order Cost" name="free_from" required value={item['free_from']} className={styles.accordionFormItem} onChange={(e) => updateShippingInfo(e, index)} />
                                                    </>
                                                }
                                                {item.type === 'pick-up' &&
                                                    <TextField label="Pickup Address" name="name" multiline rows={2} required value={item.name} className={styles.accordionFormItem} onChange={(e) => updateShippingInfo(e, index)} />

                                                }
                                                <Fab color="error" className={styles.removeButton} size="small" onClick={(e) => removeShipping(e, index)}>
                                                    <DeleteRoundedIcon />
                                                </Fab>
                                            </div>
                                        </div>
                                    ))
                                }
                                <Fab variant="extended" color="primary" className={styles.productButton} aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}>
                                    Add Shipping Type
                                </Fab>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}>
                                    <MenuItem onClick={(e) => addShipping(e, 'shipping')}>Delivery</MenuItem>
                                    <MenuItem onClick={(e) => addShipping(e, 'pick-up')}>Pickup</MenuItem>
                                </Menu>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    );
}

export default Shipping