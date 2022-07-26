import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { formats, modules, QuillNoSSRWrapper } from '../../../common/components/QuillNoSSRWrapper ';
import { COUNTRIES } from '../../../constants/Countries.constants';

function ProductBasicInformation(props) {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField required name="title" label="Title" fullWidth placeholder={"Example: Short Sleeve T-Shirt"} value={props.productData.title} onChange={props.onInputChange} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="categoryName-type-label">Category</InputLabel>
          <Select
            labelId="categoryName-type-label"
            name="categoryId"
            value={props.productData.categoryId}
            onChange={props.onInputChange}
            label="Category">
            {
              props.categories.map((item) => {
                return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="manufCountry-type-label">Manufactured In</InputLabel>
          <Select
            labelId="manufCountry-type-label"
            name="manufCountry"
            value={props.productData.manufCountry}
            onChange={props.onInputChange}
            label="Manufactured In">
            {
              COUNTRIES.map((item) => {
                return <MenuItem value={item.name} key={item.code}>{item.name}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField required name="brand" label="Brand Name" fullWidth placeholder={"Resellers selling brand items, for e.g. Sony"} value={props.productData.brand} onChange={props.onInputChange} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField label="Product Weight" name="productWeight" fullWidth required value={props.productData.productWeight} onChange={props.onInputChange}
          InputProps={{
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" value={props.productData.rawData} onChange={props.handleEditorChange} />
      </Grid>
    </Grid>
  )
}

export default ProductBasicInformation