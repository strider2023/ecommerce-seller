import React from 'react';
import cookie from "cookie";
import { ApolloClient, InMemoryCache, gql, useMutation } from "@apollo/client";
import AppContainer from '../../containers/AppContainer';
import { Avatar, Fab, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styles from '../../styles/ViewOrder.module.scss';
import Notiflix from 'notiflix';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CANCEL_ORDER = gql`
mutation ($id: String!, $orderId: String!, $productId: String!, $cancellationReason: String!) { 
  cancelOrder(input: { id: $id, orderId: $orderId, productId: $productId, cancellationReason: $cancellationReason }) { 
    code
  } 
}
`;

function ViewOrder({ orderDetails, id, orderId, productId }) {
  // console.log(orderDetails)
  const router = useRouter();

  const [cancelOrder] = useMutation(CANCEL_ORDER, {
    onCompleted: (data) => {
      console.log(data.cancelOrder);
      router.back();
      Notiflix.Notify.success('Order cancelled successfully.', { position: "left-bottom", });
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


  const handleCancelOrder = (e) => {
    Notiflix.Confirm.prompt('Cancel Order', 'Please provide a reason for cancellation.',
      '', 'Cancel Order', 'Close',
      (clientAnswer) => {
        cancelOrder({ variables: { id: id, orderId: orderId, productId: productId, cancellationReason: clientAnswer } });
      },
      (clientAnswer) => { },
      {},
    );
  }

  const printPDF = (e) => {
    const domElement = document.getElementById("printBlock");
    html2canvas(domElement, {
      onclone: document => {
        document.getElementById("print").style.visibility = "hidden";
      },
      scale: 0.65
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(orderDetails.orderId);
    });
  };

  return (
    <AppContainer showBack={true}>
      <Grid container spacing={3} justifyContent="flex-end" id="printBlock">
        <Grid item xs={12} id="print">
          <div className={styles.buttonsContainer}>
            {orderDetails.orderStatus === 'Order Processed' &&
              <>
                <Fab variant="extended" color="primary" className={styles.fullfillButton}>
                  Fullfill Order
                </Fab>
                <Fab variant="extended" color="error" className={styles.cancelButton} onClick={handleCancelOrder}>
                  Cancel Order
                </Fab>
              </>}
            <Fab variant="extended" color="secondary" className={styles.printButton} onClick={printPDF}>
              Print Order
            </Fab>
          </div>
        </Grid>
        <Grid item xs={12}>
          <p className="section-headers">{"Order No. " + orderDetails.orderId}</p>
          <p className="section-sub-headers">Order Info.</p>
        </Grid>
        <Grid item xs={6} sm={4}>
          <p className={styles.orderDetailsTitle}>Date:</p>
          <p className={styles.orderDetailsTitle}>Settlement Status:</p>
          <p className={styles.orderDetailsTitle}>Order Total:</p>
          <p className={styles.orderDetailsTitle}>Settlement Total:</p>
          {orderDetails.orderStatus === 'Order Cancelled' && <p className={styles.orderDetailsTitle}>Cancellation Reason:</p>}
        </Grid>
        <Grid item xs={6} sm={4}>
          <p className={styles.orderDetailsContent}>{new Date(Number(orderDetails.orderTs)).toLocaleString()}</p>
          <p className={styles.orderDetailsContent}>{orderDetails.orderStatus}</p>
          <p className={styles.orderDetailsContent}>{"₹ " + orderDetails.price}</p>
          <p className={styles.orderDetailsContent}>{"₹ " + orderDetails.amtPaid}</p>
          {orderDetails.orderStatus === 'Order Cancelled' && <p className={styles.orderDetailsContent}>{orderDetails.cancellationReason}</p>}
        </Grid>
        <Grid item xs={12} sm={4}>
          <p className="section-headers">{"Customer Shipping Address"}</p>
          <p className={styles.orderDetailsContent}>
            {orderDetails.shippingAddr.firstName} {orderDetails.shippingAddr.lastName || ''}<br />
            {orderDetails.shippingAddr.addressLine1} {orderDetails.shippingAddr.addressLine2 || ''}<br />
            {orderDetails.shippingAddr.city}<br />
            {orderDetails.shippingAddr.state}{","} {orderDetails.shippingAddr.postCode}
          </p>
          {
            orderDetails.courierPickUpAddr.trim().length > 0 &&
            <>
              <p className="section-headers">{"Courier Pickup Address"}</p>
              <p className={styles.orderDetailsContent}>{orderDetails.courierPickUpAddr}</p>
            </>
          }
          {
            orderDetails.soldBy &&
            <>
              <p className="section-headers">{"Sold By"}</p>
              <p className={styles.orderDetailsContent} dangerouslySetInnerHTML={{ __html: orderDetails.soldBy }}></p>
            </>
          }
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">Product</TableCell>
                  <TableCell align="center">Qty.</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><Avatar alt={orderDetails.productTitle} src={orderDetails.productImageUrl} sx={{ width: 56, height: 56 }}></Avatar></TableCell>
                  <TableCell>{orderDetails.productTitle}</TableCell>
                  <TableCell align="center">{orderDetails.qty}</TableCell>
                  <TableCell align="center">₹{orderDetails.price}</TableCell>
                  <TableCell align="center">₹{orderDetails.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}>Shipping</TableCell>
                  <TableCell align="center">₹{orderDetails.shipping}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}>Sub Total</TableCell>
                  <TableCell align="center">₹{orderDetails.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}>Sales Tax</TableCell>
                  <TableCell align="center">₹{orderDetails.salesTax}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}><b>Total</b></TableCell>
                  <TableCell align="center"><b>₹{orderDetails.price}</b></TableCell>
                </TableRow>
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

    const orderDetails = await client.query({
      query: gql`
      {supplierOrderDetail(input: {id: "${context.query.id}",orderId: "${context.query.orderid}",productId: "${context.query.productid}",}){orderId, relatedOrders{orderId,prdId} influencerCommission,platformShippingCost, parcelPickupDate,taxId, courierPickUpAddr,soldBy,orderStatus,trackingNo,shippingType,shippingName,fullfillmentDt,cancellationReason,trackingUrl,orderType,shipping,orderTs,productId,productTitle,productImageUrl,price,groupPrice,qty,total,salesTax,shipping,amtPaid, variant{title,overlayText,bgColor,id,availableQty,imageIndex}, shippingAddr{id,firstName,lastName,addressLine1,addressLine2,city,state,postCode,phoneNumber}}}
        `,
      context: {
        headers: {
          "uuid": cookies['auth_token']
        }
      },
    });

    return {
      props: {
        orderDetails: orderDetails.data.supplierOrderDetail,
        id: context.query.id,
        orderId: context.query.orderid,
        productId: context.query.productid
      }
    };
  } catch (e) {
    console.log(e.message);
    return {
      props: {
        orderDetails: {},
        id: context.query.id,
        orderId: context.query.orderid,
        productId: context.query.productid
      }
    }
  }
}

export default ViewOrder