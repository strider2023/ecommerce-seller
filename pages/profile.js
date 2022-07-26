import React, { useState } from 'react';
import Tabs from '../common/components/Tabs';
import AppContainer from '../containers/AppContainer';
import BankingInformation from '../features/profile/templates/BankingInformation';
import Banners from '../features/profile/templates/Banners';
import Commission from '../features/profile/templates/Commission';
import LinkCustomer from '../features/profile/templates/LinkCustomer';
import OrderPickup from '../features/profile/templates/OrderPickup';
import ProfileDetails from '../features/profile/templates/ProfileDetails';
import ReturnAndRefundPolicy from '../features/profile/templates/ReturnAndRefundPolicy';
import cookie from "cookie";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import ServerError from '../common/components/ServerError';

function Profile({ supplierProfile }) {
  console.log(supplierProfile)
  const [currentTab, setCurrentTab] = useState('profile');

  const onTabChangedListener = (id) => {
    setCurrentTab(id);
  }

  return (
    <AppContainer>
      {supplierProfile &&
        <>
          <Tabs {...{
            onTabChangedListener: onTabChangedListener,
            tabs: [
              { tag: "profile", label: "Profile" },
              { tag: "commission", label: "Commission" },
              { tag: "order_pickup", label: "Order Pickup" },
              { tag: "banking", label: "Banking" },
              { tag: "returns_refunds", label: "Returns & Refunds" },
              { tag: "banners", label: "Banners" },
              { tag: "link_customer", label: "Link Customer" }]
          }} />
          <div style={{ margin: '1rem' }}>
            {currentTab === 'profile' && <ProfileDetails {...{ ...supplierProfile }} />}
            {currentTab === 'commission' && <Commission {...{ ...supplierProfile }} />}
            {currentTab === 'order_pickup' && <OrderPickup {...{ ...supplierProfile }} />}
            {currentTab === 'banking' && <BankingInformation {...{ ...supplierProfile }} />}
            {currentTab === 'returns_refunds' && <ReturnAndRefundPolicy {...{ ...supplierProfile }} />}
            {currentTab === 'banners' && <Banners {...{ ...supplierProfile }} />}
            {currentTab === 'link_customer' && <LinkCustomer {...{ ...supplierProfile }} />}
          </div>
        </>
      }
      {
        !supplierProfile && <ServerError />
      }
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
      {supplierProfile{ contactName, pickupAddr, pickupAddrZip,manufName, phs, linkedUserPh,emails, addr, commissionRates{category,rate,otherFees},website, acctNo, accountHolderName,accountType,ifscCode,bankName,policydisplayText,policyUrl, banners{id, imageUrl} }}
      `,
      context: {
        headers: {
          "uuid": cookies['auth_token']
        }
      },
    });

    return {
      props: {
        supplierProfile: data.supplierProfile,
      }
    };
  } catch (e) {
    console.log(e.message)
    return {
      props: { supplierProfile: null },
    }
  }
}

export default Profile