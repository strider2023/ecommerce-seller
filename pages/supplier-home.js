import { Grid } from '@mui/material';
import React from 'react';
import AppContainer from '../containers/AppContainer';
import cookie from "cookie";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import AppTable from '../common/components/AppTable';
import { useRouter } from 'next/router'
import ServerError from '../common/components/ServerError';

function SupplierHome({ payouts }) {
  // console.log(payouts)
  const router = useRouter();

  const PAYOUTS_TABLE = {
    title: "Payout Schedule",
    defaultOrder: "asc",
    defaultOrderColumn: "status",
    primaryRowKey: "ts",
    defaultPage: 0,
    defaultRowsPerPage: 10,
    showCreate: false,
    createURL: "",
    onClickURL: "/payout/details?dt=",
    overridenClick: (e, item) => {
      e.preventDefault();
      router.push("/payout/details?dt=" + item['dt'] + "-" + item['ts']);
    },
    headCells: [
      { id: 'dt', type: 'TEXT', label: 'Date' },
      { id: 'ts', type: 'DATE', label: 'Payout Date' },
      { id: 'amt', type: 'TEXT', label: 'Amount' },
      { id: 'status', type: 'TEXT', label: 'Status' },
    ]
  }

  return (
    <AppContainer>
      {payouts && <Grid container spacing={3}>
        <Grid item xs={12}>
          <p className="section-headers">Payouts</p>
        </Grid>
        <Grid item xs={12}>
          <AppTable {...PAYOUTS_TABLE} tableData={payouts.payouts || []} />
        </Grid>
      </Grid>
      }
      {!payouts && <ServerError />}
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

    const { data } = await client.query({
      query: gql`
      {getSuppliersPayoutSchedules(input: {next:  true,paginationOffset:  "null",}){payouts{dt, amt, ts, status}, paginationOffset }, supplierPendingOrders{count}}
      `,
      context: {
        headers: {
          "uuid": cookies['auth_token']
        }
      },
    });

    return {
      props: {
        payouts: data.getSuppliersPayoutSchedules,
      }
    };
  } catch (e) {
    return {
      props: { payouts: null },
    }
  }
}

export default SupplierHome