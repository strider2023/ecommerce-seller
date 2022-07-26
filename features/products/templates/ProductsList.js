import { Divider, Grid } from '@mui/material';
import React from 'react';
import styles from './styles/Products.module.scss';
import ProductListItem from '../components/ProductListItem';

function ProductsList(props) {
  return (
    <div>
      <div className={styles.productsListContainer}>
        <Grid container spacing={3}>
          {props.result.length > 0 && props.result.map((item, index) => (
            <Grid item xs={12} sm={4} lg={3} key={index}>
              <>
                <ProductListItem {...{ ...item, showAdditionalHeaders: props.showAdditionalHeaders, onPublishProduct: props.onPublishProduct }} />
                <Divider />
              </>
            </Grid>
          ))}
        </Grid>
        {
          props.result.length === 0 &&
          <div className={styles.emptySearchContainer}>
            <img src={"../images/search.png"} alt={'no data found'} className={styles.emptyImage} />
            <h4>
              No Data Found
            </h4>
          </div>
        }
      </div>
    </div>
  )
}

export default ProductsList