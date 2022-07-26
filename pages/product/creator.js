import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Tabs from '../../common/components/Tabs';
import AppContainer from '../../containers/AppContainer'
import AddProductImages from '../../features/products/templates/AddProductImages';
import ProductBasicInformation from '../../features/products/templates/BasicInformation';
import PriceDiscountsAndVariants from '../../features/products/templates/PriceDiscountsAndVariants';
import Shipping from '../../features/products/templates/Shipping';
import cookie from "cookie";
import { ApolloClient, InMemoryCache, gql, useMutation } from "@apollo/client";
import cookieCutter from 'cookie-cutter';
import Notiflix from 'notiflix';
import { CREATE_PRODUCT } from '../../schemas/mutations';
import axios from 'axios';

const TABS = [
    { tag: "basic", label: "1. Basic Information" },
    { tag: "images", label: "2. Add Images" },
    { tag: "price", label: "3. Price, Discounts & Variants" },
    { tag: "shipping", label: "4. Shipping" }];

function ProductCreator({ categories, productDetails, productId }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [currentTab, setCurrentTab] = useState(TABS[currentStep].tag);
    const [productData, setProductData] = useState({
        id: productId || Math.floor(Math.random() * Math.pow(10, 7)),
        title: productDetails?.title || "",
        description: productDetails?.title || "",
        manufCountry: productDetails?.manufCountry || "",
        categoryId: productDetails?.categoryId || -1,
        categoryName: productDetails?.categoryName || "",
        rawData: productDetails?.rawData || "",
        brand: productDetails?.brand || "",
        productWeight: productDetails?.productWeight || "",
        imageUrl: productDetails?.imageUrl || [],
        mrp: productDetails?.mrp || 0,
        discountPrice: productDetails?.discountPrice || 0,
        startTs: productDetails?.startTs || new Date(),
        expiresTs: productDetails?.expiresTs || new Date(),
        tags: productDetails?.tags || "",
        shipping: productDetails?.shipping || [],
        priceTier: productDetails?.priceTier || []
    });

    const [createNewProduct] = useMutation(CREATE_PRODUCT, {
        onCompleted: async (res) => {
            try {
                const formData = new FormData();
                for (const asset of productData.imageUrl) {
                    if (typeof asset !== 'string') {
                        formData.append(asset.name, asset);
                    }
                }
                const response = await axios.post(process.env.NEXT_PUBLIC_LEHLAH_BACKEND_ENDPOINT + `/addproductimages/${productData.id}/`, formData, {
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
                Notiflix.Notify.success('Collection created successfully.', { position: "left-bottom", });
                router.back();
            }
        },
        onError: (e) => {
            console.error(e);
            Notiflix.Notify.failure('Something went wrong. Please try again.', { position: "left-bottom", });
        },
        context: {
            headers: {
                "uuid": cookieCutter.get('auth_token')
            }
        }
    });

    useEffect(() => {
        setCurrentTab(TABS[currentStep].tag);
    }, [currentStep, setCurrentTab]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value
        }));
        e.preventDefault();
    }

    const handleEditorChange = (value) => {
        setProductData((prev) => ({
            ...prev,
            rawData: value
        }));
    }

    const previousStep = (e) => {
        if (currentStep !== 0) {
            setCurrentStep((prev) => prev - 1);
        }
    }

    const handleFileChange = (files) => {
        // console.log(files);
        const assets = [...productData.imageUrl, ...files]
        setProductData((prev) => ({
            ...prev,
            imageUrl: assets
        }));
    };

    const removeImage = (e, index) => {
        e.preventDefault();
        let assets = [...productData.imageUrl];
        assets.splice(index, 1);
        setProductData((prev) => ({
            ...prev,
            imageUrl: assets
        }));
    }

    const nextStep = (e) => {
        if (currentStep < TABS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            console.log('finish', productData.imageUrl);
            createNewProduct({
                variables: {
                    id: productData.id,
                    productWeight: parseFloat(productData.productWeight),
                    startDate: productData.startTs.getTime().toString(),
                    expiryDate: productData.expiresTs.getTime().toString(),
                    title: productData.title,
                    categoryId: productData.categoryId,
                    categoryName: "Bags",
                    manufCountry: productData.manufCountry,
                    description: productData.rawData,
                    singleBuyPrice: parseFloat(productData.singleBuyPrice),
                    mrp: parseFloat(productData.mrp),
                    groupBuyPrice: 200,
                    brand: productData.brand,
                    productTags: productData.tags,
                    shipping: productData.shipping, //[{ id: 1, type: "pickup", name: "test", price: 0 }],
                    priceTier: [{ min: 1, max: 1, price: 200 }, { min: 1, max: 2, price: 200 }, { min: 3, max: 0, price: 196 }],
                    variant: [{ id: 2161610, title: "Color", type: "radio", items: [{ id: 8159314, title: "Red", availableQty: 100, overlayText: "", imageIndex: null, sku: "test" }] }],
                    rawVariant: [{ key: "Red", qty: 100, sku: "test", imageIndex: null }]
                }
            });
        }
    }

    return (
        <AppContainer showBack={true}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p className="section-headers">Add New Product Details</p>
                </Grid>
                <Grid item xs={12}>
                    <Tabs isStatic={true} defaultTab={currentTab} tabs={TABS} />
                </Grid>
                <Grid item xs={12}>
                    {currentStep === 0 && <ProductBasicInformation categories={categories} productData={productData} onInputChange={onInputChange} handleEditorChange={handleEditorChange} />}
                    {currentStep === 1 && <AddProductImages productData={productData} setProductData={setProductData} />}
                    {currentStep === 2 && <PriceDiscountsAndVariants productData={productData} setProductData={setProductData} onInputChange={onInputChange} handleEditorChange={handleEditorChange} />}
                    {currentStep === 3 && <Shipping productData={productData} setProductData={setProductData} onInputChange={onInputChange} />}
                </Grid>
                {currentStep !== 0 && <Grid item xs={12} sm={3}>
                    <button className="app-button" onClick={previousStep}>Previous</button>
                </Grid>}
                <Grid item xs={12} sm={3}>
                    <button className="app-button" onClick={nextStep}>{currentStep === (TABS.length - 1) ? "Finish" : "Next"}</button>
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

        const categories = await client.query({
            query: gql`
        {categories{id,name}}
        `,
            context: {
                headers: {
                    "uuid": cookies['auth_token']
                }
            },
        });

        let productDetails = null;
        if (context.query.productId) {
            productDetails = await client.query({
                query: gql`
                {getSupplierProductDetail (input:{productId: "${context.query.productId || ""}"}){id, rawData, categoryName, manufCountry, tags, imageUrl, discountPrice, mrp,originalPrice, title, description, brand, shipping{id,type,name,price,free_from},priceTier{min, max, price}, productWeight, influencerName, startTs, expiresTs, rawVariant{key, qty, sku, imageIndex}, variant{title, id, type items{title, overlayText, bgColor, id, availableQty, imageIndex}}}} 
              `
            });
        }

        return {
            props: {
                categories: categories.data.categories,
                productDetails: productDetails ? productDetails.data.getSupplierProductDetail : null,
                productId: context.query.productId || ""
            }
        };
    } catch (e) {
        console.log(e.message)
        return {
            props: { categories: null, productDetails: null, productId: context.query.productId || "" },
        }
    }
}

export default ProductCreator