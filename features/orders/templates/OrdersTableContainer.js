import React from 'react';
import AppTable from '../../../common/components/AppTable';
import { useRouter } from 'next/router'

function OrdersTableContainer(props) {
    const router = useRouter();

    const ORDERS_TABLE = {
        title: props.title,
        defaultOrder: "asc",
        defaultOrderColumn: "orderId",
        primaryRowKey: "orderId",
        defaultPage: 0,
        defaultRowsPerPage: 10,
        showCreate: false,
        createURL: "",
        onClickURL: "/order/view?orderId=",
        overridenClick: (e, item) => {
            e.preventDefault();
            router.push(`/order/view?id=${item['userId']}&orderid=${item['orderId']}&productid=${item['productId']}`);
        },
        headCells: [
            { id: 'orderId', type: 'TEXT', label: 'Order Id' },
            { id: 'orderTs', type: 'DATE', label: 'Order Date' },
            { id: 'qty', type: 'TEXT', label: 'Quantity' },
            { id: 'price', type: 'TEXT', label: 'Total' },
            { id: 'amtPaid', type: 'TEXT', label: 'Settlement Amount' },
            { id: 'orderStatus', type: 'TEXT', label: 'Status' },
            { id: 'shippingType', type: 'TEXT', label: 'Delivery' },
        ]
    }

    return (
        <AppTable {...ORDERS_TABLE} tableData={props.orders || []} />
    )
}

export default OrdersTableContainer