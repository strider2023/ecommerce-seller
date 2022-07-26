import { gql } from "@apollo/client";

// mutation{createNewProduct(input: {id:  1432897,productWeight:  1.0000,startDate:  "1655317800",expiryDate:  "1659119400",title:  "Arindam%20Test",categoryId:  15,categoryName:  "Bags",manufCountry:  "India",rawImages: [],imageUrlsToUpload: [],imageUrlsToDelete: [],description:  "%3Cp%3ETest%3C/p%3E",singleBuyPrice:  200,mrp:  200,groupBuyPrice:  200,priceTier:  [{min:1,max:1,price:200},{min:1,max:2,price:200},{min:3,max:0,price:196}],shipping:  [{id:1,type:"pickup",name:"test",price:0}],allowBackOrders:  true,isPromotional:  false,productTags:  "test",brand:  "Test",variant: [{id:2161610,title:"Color",type:"radio",items:[{id:8159314,title:"Red",availableQty:100,overlayText:"",imageIndex:null,sku:"test"}]}]rawVariant: [{key:"Red",qty:100,sku:"test",imageIndex:null}]}) { code, msg } }

export const CREATE_PRODUCT = gql`
mutation (
    $id: Int!, 
    $productWeight: Float!, 
    $startDate: String!, 
    $expiryDate: String, 
    $title: String!, 
    $categoryId: Int!, 
    $categoryName: String!, 
    $manufCountry: String!, 
    $description: String!, 
    $singleBuyPrice: Float!, 
    $mrp: Float!, 
    $groupBuyPrice: Float!, 
    $brand: String,
    $productTags: String,
    $shipping: [NewProductShipping],
    $priceTier: [NewProductPriceTier],
    $variant: [NewProductVariant],
    $rawVariant: [NewProductRawVariant]
    ) { 
    createNewProduct(input: { 
        id: $id, 
        productWeight: $productWeight, 
        startDate: $startDate, 
        expiryDate: $expiryDate, 
        title: $title, 
        categoryId: $categoryId,
        categoryName: $categoryName, 
        manufCountry: $manufCountry,
        description: $description,
        singleBuyPrice: $singleBuyPrice,
        mrp: $mrp,
        groupBuyPrice: $groupBuyPrice,
        brand: $brand,
        rawImages: [],
        imageUrlsToUpload: [],
        imageUrlsToDelete: [],
        allowBackOrders: true,
        isPromotional: false,
        productTags: $productTags,
        shipping: $shipping,
        priceTier: $priceTier,
        rawVariant: $rawVariant,
        variant: $variant
    }) { 
        code, msg
  } 
}
`;

// mutation{updateProductDetails(input: { id: 1432897,title:  "Arindam%20Test%20Update",productWeight:  1.0000,priceTier:  [{min:1,max:1,price:200},{min:1,max:2,price:200},{min:3,max:0,price:196}],shipping:  [{id:1,type:"pickup",name:"test",price:0}],brand:  "Test",variant: [{id:1017112,title:"Color",type:"radio",items:[{id:2451517,title:"Red",availableQty:100,overlayText:"",imageIndex:null,sku:"test"}]}]}) { code, msg } }

export const UPDATE_PRODUCT = gql`
mutation (
    $id: Int!, 
    $productWeight: Float!, 
    $startDate: String!, 
    $expiryDate: String, 
    $title: String!, 
    $categoryId: Int!, 
    $categoryName: String!, 
    $manufCountry: String!, 
    $description: String!, 
    $singleBuyPrice: Float!, 
    $mrp: Float!, 
    $groupBuyPrice: Float!, 
    $brand: String,
    $productTags: String,
    $shipping: [NewProductShipping],
    $priceTier: [NewProductPriceTier],
    $variant: [NewProductVariant],
    $rawVariant: [NewProductRawVariant]
    ) { 
    updateProductDetails(input: { 
        id: $id, 
        productWeight: $productWeight, 
        startDate: $startDate, 
        expiryDate: $expiryDate, 
        title: $title, 
        categoryId: $categoryId,
        categoryName: $categoryName, 
        manufCountry: $manufCountry,
        description: $description,
        singleBuyPrice: $singleBuyPrice,
        mrp: $mrp,
        groupBuyPrice: $groupBuyPrice,
        brand: $brand,
        rawImages: [],
        imageUrlsToUpload: [],
        imageUrlsToDelete: [],
        allowBackOrders: true,
        isPromotional: false,
        productTags: $productTags,
        shipping: $shipping,
        priceTier: $priceTier,
        rawVariant: $rawVariant,
        variant: $variant
    }) { 
        code, msg
  } 
}
`;