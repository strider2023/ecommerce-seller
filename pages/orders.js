import React from 'react';
import Tabs from '../common/components/Tabs';
import AppContainer from '../containers/AppContainer';
import OrdersTableContainer from '../features/orders/templates/OrdersTableContainer';
import cookie from "cookie";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import ServerError from '../common/components/ServerError';
import { useRouter } from 'next/router';

function Orders({ orders, tab }) {
  const router = useRouter();

  const onTabChangedListener = (id) => {
    router.query.tab = id;
    router.push(router);
  }

  return (
    <AppContainer>
      <Tabs {...{
        onTabChangedListener: onTabChangedListener,
        tabs: [
          { tag: "pending", label: "Pending Orders" },
          { tag: "complete", label: "Fullfilled Orders" }]
      }} />
      <div style={{ margin: '1rem' }}>
        {tab === 'pending' && orders && <OrdersTableContainer {...{ ...orders, title: "Pending Orders" }} />}
        {tab === 'pending' && !orders && <ServerError />}
        {tab === 'complete' && orders && <OrdersTableContainer {...{ ...orders, title: "Fulfilled Orders" }} />}
        {tab === 'complete' && !orders && <ServerError />}
      </div>
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
    const searchFilters = {
      pending: context.query.tab === 'pending' ? true : false
    }

    const orders = await client.query({
      query: gql`
      {getOrdersToFulfill(input: {next:  true,paginationOffset:  "null",pendingOrders: ${searchFilters.pending}}){ orders{orderId, parcelPickupDate,fullfillmentDt, shippingType,orderStatus,orderType,shipping,orderTs,productId,productTitle,userId,productImageUrl,price,groupPrice,qty,total,salesTax,shipping,amtPaid, variant{title,overlayText,bgColor,id,availableQty,imageIndex}, shippingAddr{id,firstName,lastName,addressLine1,addressLine2,city,state,postCode,phoneNumber}}, paginationOffset }}
      `,
      context: {
        headers: {
          "uuid": cookies['auth_token']
        }
      },
    });

    return {
      props: {
        orders: orders.data.getOrdersToFulfill,
        tab: context.query.tab,
      }
    };
  } catch (e) {
    return {
      props: { orders: null, tab: context.query.tab, },
    }
  }
}

export default Orders