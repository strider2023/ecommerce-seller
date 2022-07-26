import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import AppContainer from '../../containers/AppContainer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import styles from '../../styles/Product.module.scss';
import cookie from "cookie";
import { ApolloClient, InMemoryCache, gql, useMutation } from "@apollo/client";
import ProductsModal from '../../features/products/templates/ProductsModal';
import { INDIAN_LANGUAGES } from '../../constants/App.constants';
import Notiflix from 'notiflix';
import cookieCutter from 'cookie-cutter';
import axios from 'axios';
import { useRouter } from 'next/router';
import DragDropFile from '../../common/components/DragDropFile';

const CREATE_COLLECTION = gql`
mutation ($title: String!, $startTime: String!, $endTime: String!, $showSubType: String!, $productId: String!, $selectedLanguage: String!) { 
  addBrandVideo(input: { title: $title, startTime: $startTime, endTime: $endTime, showSubType: $showSubType, productId: $productId, selectedLanguage: $selectedLanguage }) { 
        id, influencerName 
  } 
}
`;

// https://api.lehlah.club/brandvideos/4262701/1
// {"preview_url":"https://assets.lehlah.club/show/4262701/341434596260.mp4","influencerName":"#predeep","thumbnail_url":"https://assets.lehlah.club/show/4262701/341434596260.jpg"}

function CollectionsCreator({ storeItems, collectionId }) {
  // console.log(storeItems)
  const router = useRouter();
  const fileTypes = ["video/mp4"];
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: "",
    file: null,
    language: "",
    type: "video"
  });

  const [products, setProducts] = useState([]);

  const [addBrandVideo] = useMutation(CREATE_COLLECTION, {
    onCompleted: (res) => {
      console.log(res);
      if (data.type === 'video') {
        try {
          const formData = new FormData();
          formData.append("showvideos", data.file);
          const response = axios.post(process.env.NEXT_PUBLIC_LEHLAH_BACKEND_ENDPOINT + `/brandvideos/${res.addBrandVideo.id}/1`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "uuid": cookieCutter.get('auth_token')
            },
          });
          console.log(response.data);
          Notiflix.Notify.success('Collection created successfully.', { position: "left-bottom", });
          router.back();
        } catch (e) {
          console.log(e.message);
        }
      } else {
        Notiflix.Notify.success('Collection created successfully.', { position: "left-bottom", });
        router.back();
      }
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

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const onFileUpload = (files) => {
    setData((prev) => ({
      ...prev,
      file: files[0]
    }));
  }

  const removeProduct = (e, index) => {
    e.preventDefault();
    let data = [...products];
    data.splice(index, 1);
    setProducts(data);
  }

  const handleSaveCollection = (e) => {
    e.preventDefault();
    let pids = [];
    for (const p of products) {
      pids.push(p.id);
    }
    addBrandVideo({
      variables: {
        title: data.title,
        showSubType: data.type,
        productId: pids.toString(),
        selectedLanguage: data.language,
        startTime: new Date().getTime().toString(),
        endTime: new Date().getTime().toString()
      }
    });
  }

  return (
    <AppContainer showBack={true}>
      <ProductsModal open={open}
        handleClose={() => { setOpen(false) }}
        onItemSelect={() => { setOpen(false) }}
        products={storeItems.result || []}
        selectedProducts={products}
        setProducts={setProducts} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <p className="section-headers">{"Create Collection"}</p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required name="title" label="Title" fullWidth onChange={onInputChange} value={data.title} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Collection Type</InputLabel>
            <Select
              labelId="type-label"
              name="type"
              value={data.type}
              label="Collection Type"
              onChange={onInputChange}>
              <MenuItem value={"video"}>{"Video"}</MenuItem>
              <MenuItem value={"collections"}>{"Collections"}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="language-label">Language Type</InputLabel>
            <Select
              labelId="language-label"
              name="language"
              value={data.language}
              label="Language Type"
              onChange={onInputChange}>
              {
                INDIAN_LANGUAGES.map((data) => (
                  <MenuItem value={data.id} key={data.id}>{data.label}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          {data.type === 'video' && <DragDropFile handleFiles={onFileUpload} name="file" types={fileTypes}/>}
        </Grid>
        {data.file && <Grid item xs={12}>
          <video width="400" controls>
            <source src={URL.createObjectURL(data.file)} />
          </video>
        </Grid>
        }
        <Grid item xs={12}>
          <p className="section-headers">{"Products"}</p>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.collectionItems}>
            <div className={styles.collectionItemAdd} onClick={() => { setOpen(true) }}>
              <img src={"../images/add.svg"} alt="Add Product" />
              <p>Add Products</p>
            </div>
            {
              products.map((item, index) => (
                <div className={styles.collectionItemSelected} key={index}>
                  <img src={item.imageUrl} alt={item.name} />
                  <IconButton className={styles.deleteIcon} onClick={(e) => removeProduct(e, index)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                </div>
              ))
            }
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <button className="app-button" onClick={handleSaveCollection}>Save</button>
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

    const products = await client.query({
      query: gql`
      {getSupplierAllProducts(input: {searchText:  "",paginationOffset:  "null",size: 100}){result{id, name,description,price, groupPrice,imageUrl,outOfStock,status} paginationOffset, currency}}
      `,
      context: {
        headers: {
          "uuid": cookies['auth_token']
        }
      },
    });

    return {
      props: {
        storeItems: products.data.getSupplierAllProducts,
        collectionId: context.query.collectionId || null
      }
    };
  } catch (e) {
    return {
      props: { storeItems: { result: [] }, collectionId: null },
    }
  }
}

export default CollectionsCreator