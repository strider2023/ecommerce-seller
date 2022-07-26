import React from 'react';
import AppContainer from '../../containers/AppContainer';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import cookie from "cookie";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styles from '../../styles/Payout.module.scss';
import { useRouter } from 'next/router'

function PayoutDetails({ payoutDetails }) {
    const router = useRouter();
    // console.log(payoutDetails)

    const handleTableItemClick = (e, item) => {
        e.preventDefault();
        router.push(`/order/view?id=${item['id']}&orderid=${item['orderId']}&productid=${item['productId']}`);
    }

    return (
        <AppContainer showBack={true}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p className="section-headers">{"Payout Details"}</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={5} className={styles.overviewContainer}>
                        <p className={styles.amount}>{"₹ " + payoutDetails.amt}</p>
                        <p className={styles.date}>{new Date(Number.parseInt(payoutDetails.settlementDt)).toUTCString()}</p>
                        <p className={styles.status}>{payoutDetails.status === 0 ? "In Progress" : "Complete"}</p>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="orders table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Order Id</TableCell>
                                    <TableCell align="center">Gross Amount</TableCell>
                                    <TableCell align="center">Commission</TableCell>
                                    <TableCell align="center">Total Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payoutDetails.orderList.map((row) => (
                                    <TableRow key={row.id} onClick={(e) => handleTableItemClick(e, row)} style={{ cursor: 'pointer' }} hover>
                                        <TableCell component="th" align="center">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">{"₹ " + row.totalAmount}</TableCell>
                                        <TableCell align="center">{"₹ " + parseFloat(parseFloat(row.totalAmount) - parseFloat(row.settlementAmount)).toFixed(2)}</TableCell>
                                        <TableCell align="center">{"₹ " + row.settlementAmount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </AppContainer>
    )
}

export async function getServerSideProps(context) {
    try {
        const client = new ApolloClient({
            uri: process.env.NEXT_PUBLIC_LEHLAH_BACKEND_GRAPHQL_ENDPOINT,
            cache: new InMemoryCache(),
        });
        const cookies = cookie.parse(context.req.headers.cookie || '');

        const payoutDetails = await client.query({
            query: gql`
            {supplierPayoutDetailInfo(input: {settlementDate: "${context.query.dt}",}){ settlementDt, amt, status,orderList{orderId,productId,settlementAmount, shipping,totalAmount, id} }}
          `,
            context: {
                headers: {
                    "uuid": cookies['auth_token']
                }
            },
        });

        return {
            props: {
                payoutDetails: payoutDetails.data.supplierPayoutDetailInfo
            }
        };
    } catch (e) {
        console.log(e.message);
        return {
            props: { payoutDetails: {} },
        }
    }
}

export default PayoutDetails