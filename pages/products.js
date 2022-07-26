import React, { useState } from 'react';
import Tabs from '../common/components/Tabs';
import AppContainer from '../containers/AppContainer';
import ProductsList from '../features/products/templates/ProductsList';
import cookie from "cookie";
import { ApolloClient, InMemoryCache, gql, useMutation } from "@apollo/client";
import ServerError from '../common/components/ServerError';
import { useRouter } from 'next/router';
import ProductActionBar from '../features/products/components/ProductActionBar';
import Notiflix from 'notiflix';
import cookieCutter from 'cookie-cutter';

const MANAGE_PUBLISH = gql`
mutation ($publish: Boolean!) { 
  updateAllProductStatus(input: { type:  "groupbuy", publish: $publish }) { 
    code, msg 
  } 
}
`;

const MANAGE_PRODUCT_PUBLISH = gql`
mutation ($productId: String!, $publishProduct: Boolean!) { 
  updateProductStatus(input: { productId:  $productId, publishProduct: $publishProduct })
}
`;

function Products({ products, tab, status, search }) {
  const router = useRouter();
  const [filterData, setFilterData] = useState({ status: status, search: search });

  const [updateAllProductStatus] = useMutation(MANAGE_PUBLISH, {
    onCompleted: (data) => {
      router.reload();
      Notiflix.Notify.success('Products status updated successfully.', { position: "left-bottom", });
    },
    onError: () => {
      Notiflix.Notify.failure('Something went wrong. Please try again.', { position: "left-bottom", });
    },
    context: {
      headers: {
        "uuid": cookieCutter.get('auth_token')
      }
    }
  });

  const [updateProductStatus] = useMutation(MANAGE_PRODUCT_PUBLISH, {
    onCompleted: (data) => {
      router.reload();
      Notiflix.Notify.success('Product status updated successfully.', { position: "left-bottom", });
    },
    onError: () => {
      Notiflix.Notify.failure('Something went wrong. Please try again.', { position: "left-bottom", });
    },
    context: {
      headers: {
        "uuid": cookieCutter.get('auth_token')
      }
    }
  });

  const onTabChangedListener = (id) => {
    router.query.tab = id;
    router.push(router);
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'status') {
      router.query.status = value;
      router.push(router);
    } else {
      setFilterData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
    e.preventDefault();
  }

  const onSearch = (e) => {
    if (filterData.search.trim().length === 0) {
      delete router.query.search;
      router.push(router);
    } else {
      router.query.search = filterData.search;
      router.push(router);
    }
    e.preventDefault();
  }

  const onPublish = (e, isPublish) => {
    e.preventDefault();
    Notiflix.Confirm.show('Confirm', `Are you sure you want to ${isPublish ? "publish" : "unpublish"} all products?`,
      'Yes', 'No',
      () => {
        updateAllProductStatus({ variables: { publish: isPublish } });
      }, () => { }, {},
    );
  }

  const onPublishProduct = (e, productName, productId, isPublish) => {
    e.preventDefault();
    Notiflix.Confirm.show('Confirm', `Are you sure you want to ${isPublish ? "publish" : "unpublish"} the product, ${productName}?`,
      'Yes', 'No',
      () => {
        updateProductStatus({ variables: { productId: productId, publishProduct: isPublish } });
      }, () => { }, {},
    );
  }

  return (
    <AppContainer>
      <Tabs {...{
        onTabChangedListener: onTabChangedListener,
        tabs: [
          { tag: "products", label: "Products" },
          { tag: "shared_products", label: "Shared Products" }]
      }} />
      <div style={{ margin: '1rem' }}>
        {/* <Link href="/product/import" passHref>
          <p style={{ textAlign: 'right', cursor: 'pointer' }}>Import Products</p>
        </Link> */}
        <ProductActionBar {...{ filterData, onInputChange, onSearch, onPublish }} />
        {tab === 'products' && products && <ProductsList {...{ ...products, onPublishProduct, showAdditionalHeaders: false }} />}
        {tab === 'products' && !products && <ServerError />}
        {tab === 'shared_products' && products && <ProductsList {...{ ...products, onPublishProduct, showAdditionalHeaders: true }} />}
        {tab === 'shared_products' && !products && <ServerError />}
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
      shared: context.query.tab === 'products' ? false : true,
      status: context.query.status || "all",
      search: context.query.search || ""
    }

    const products = await client.query({
      query: gql`
      {getSupplierAllProducts(input: {type:  "groupbuy", shared:  ${searchFilters.shared}, prdStatus:  "${searchFilters.status}", searchText:  "${searchFilters.search}", paginationOffset:  "null"})
      {result{id, influencerName,influencerCommission,name,description,price, groupPrice,discount,imageUrl,soldCount,groupCount,likesCount,categoryId,outOfStock,expiresTs,raffleViewedCount,status} paginationOffset, currency}}
      `,
      context: {
        headers: {
          "uuid": cookies['auth_token']
        }
      },
    });

    return {
      props: {
        products: products.data.getSupplierAllProducts,
        tab: context.query.tab,
        status: searchFilters.status,
        search: searchFilters.search
      }
    };
  } catch (e) {
    return {
      props: {
        products: null,
        tab: context.query.tab,
        status: context.query.status || "all",
        search: context.query.search || ""
      },
    }
  }
}

export default Products