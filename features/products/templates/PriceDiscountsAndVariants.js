import { Accordion, AccordionDetails, AccordionSummary, Fab, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import styles from './styles/PriceDiscountsAndVariants.module.scss';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function PriceDiscountsAndVariants(props) {
    const [tierPricing, setTierPricing] = useState([]);
    const [variant, setVariants] = useState([]);

    const addTier = (e) => {
        let data = [...tierPricing];
        data.push({ count: 0, discount: 0 });
        setTierPricing(data);
        e.preventDefault();
    }

    const addVariant = (e) => {
        let data = [...variant];
        data.push({ type: 0, value: 0 });
        setVariants(data);
        e.preventDefault();
    }

    const removeItem = (e, type, index) => {
        if (type == 'tier') {
            let data = [...tierPricing];
            data.splice(index, 1);
            setTierPricing(data);
        } else {
            let data = [...variant];
            data.splice(index, 1);
            setVariants(data);
        }
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <TextField label="MRP" name="mrp" fullWidth required type="number" value={props.productData.mrp} onChange={props.onInputChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField label="Buy Now Price" name="singleBuyPrice" fullWidth required type="number" value={props.productData.singleBuyPrice} onChange={props.onInputChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField label="Group Buy Discount Percentage" placeholder="Price For 1-2 Members In Group" name="groupBuyPrice" fullWidth required type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField label="Available Quantity" name="weight" fullWidth required type="number" />
                </Grid>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="returns-content" id="returns-header" >
                            <p className={styles.accordionHeader}>Product Variants/Options (eg. Color, Sizes)</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={styles.accordionBodyContainer}>
                                {
                                    variant.map((item, index) => (
                                        <div className={styles.accordionBodyItem} key={index}>
                                            <p className={styles.accordionTitle}>{"Tier " + (index + 1)}</p>
                                            <div className={styles.accordionFormContent}>
                                                <FormControl className={styles.accordionFormItem}>
                                                    <Select
                                                        labelId="account-type-label"
                                                        name="title"
                                                        value={item.type}>
                                                        <MenuItem value={"Variant"}>{"Variant"}</MenuItem>
                                                        <MenuItem value={"Color"}>{"Color"}</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField label="Value" placeholder="e.g. Small, Medium, Large" name="key" required value={item.value} className={styles.accordionFormItem} />
                                                <Fab color="error" className={styles.removeButton} size="small" onClick={(e) => removeItem(e, 'variant', index)}>
                                                    <DeleteRoundedIcon />
                                                </Fab>
                                            </div>
                                        </div>
                                    ))
                                }
                                <Fab variant="extended" color="primary" className={styles.productButton} onClick={addVariant}>
                                    Add Variant
                                </Fab>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="returns-content" id="returns-header" >
                            <p className={styles.accordionHeader}>Tier Pricing (3 or more group members)</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={styles.accordionBodyContainer}>
                                {
                                    props.productData.priceTier.map((item, index) => (
                                        <div className={styles.accordionBodyItem} key={index}>
                                            <p className={styles.accordionTitle}>{"Tier " + (index + 1)}</p>
                                            <div className={styles.accordionFormContent}>
                                                <TextField label="Minimum Group Count" name="min" required type="number" value={item.min} className={styles.accordionFormItem} />
                                                <TextField label="Discount" name="price" required type="number" value={item.price} className={styles.accordionFormItem}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                                    }}
                                                />
                                                <Fab color="error" className={styles.removeButton} size="small" onClick={(e) => removeItem(e, 'tier', index)}>
                                                    <DeleteRoundedIcon />
                                                </Fab>
                                            </div>
                                        </div>
                                    ))
                                }
                                <Fab variant="extended" color="primary" className={styles.productButton} onClick={addTier}>
                                    Add New Tier
                                </Fab>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    )
}

export default PriceDiscountsAndVariants