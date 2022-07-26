import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import styles from './styles/ReturnAndRefundPolicy.module.scss';
import { formats, modules, QuillNoSSRWrapper } from '../../../common/components/QuillNoSSRWrapper ';

function ReturnAndRefundPolicy() {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <p className="section-headers">{'Return, Refund and Exchange Policies'}</p>
                <p className="section-sub-headers">This information will show up on the product page.</p>
            </Grid>
            <Grid item xs={12}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="returns-content" id="returns-header" >
                        <p className={styles.accordionHeader}>Return Policy</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow"/>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="refunds-content" id="refunds-header" >
                        <p className={styles.accordionHeader}>Refund Policy</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow"/>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="exchange-content" id="exchange-header" >
                        <p className={styles.accordionHeader}>Exchange Policy</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow"/>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}

export default ReturnAndRefundPolicy