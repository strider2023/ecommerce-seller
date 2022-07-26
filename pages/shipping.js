import { Grid, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import AppContainer from '../containers/AppContainer';

function Shipping() {
  return (
    <AppContainer>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p className="section-headers">Shipping Information</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="from_pincode" label="From Pincode" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="to_pincode" label="To Pincode" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <p className="section-headers">Package Information</p>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Parcel Length" id="length" fullWidth required
              InputProps={{
                endAdornment: <InputAdornment position="start">cm</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Parcel Height" id="height" fullWidth required
              InputProps={{
                endAdornment: <InputAdornment position="start">cm</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Parcel Breadth" id="breadth" fullWidth required
              InputProps={{
                endAdornment: <InputAdornment position="start">cm</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Parcel Weight" id="weight" fullWidth required
              InputProps={{
                endAdornment: <InputAdornment position="start">kg</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <button className="app-button">Calculate</button>
          </Grid>
        </Grid>
      </form>
    </AppContainer>
  )
}

export default Shipping