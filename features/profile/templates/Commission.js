import { Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React from 'react'

function Commission(props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <p className="section-headers">Commission Info</p>
        <p className="section-sub-headers">GST will be collected for the commissions.</p>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Commission</TableCell>
                <TableCell align="center">Other Fees</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.commissionRates.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align="center">
                      {data.category}
                    </TableCell>
                    <TableCell align="center">{`${data.rate} + GST`}</TableCell>
                    <TableCell align="center">{data.otherFees}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default Commission