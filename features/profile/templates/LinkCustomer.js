import { Grid, TextField } from '@mui/material'
import React, { useState } from 'react'

function LinkCustomer(props) {
  const [linkedUserPh, setLinkedUserPh] = useState(props.linkedUserPh);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setLinkedUserPh((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <p className="section-headers">Link With Customer Account</p>
          <p className="section-sub-headers">You can link your seller account with your customer account.</p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required name="linkedUserPh" label="Customer Account Phone Number" fullWidth type="tel" value={linkedUserPh} onChange={onInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item xs={12} sm={3}>
          <button className="app-button">Save</button>
        </Grid>
      </Grid>
    </form>
  )
}

export default LinkCustomer