import React from 'react';
import Head from 'next/head';

function CommonHead(props) {
    return (
        <Head>
            <title>{props.title || 'Lehlah'}</title>
            <meta name="description" content={props.description || 'Lehlah, your personal stylist, available anytime and anywhere.'} />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preload" href="/fonts/Poppins/Poppins-Regular.ttf" as="font" crossOrigin="" />
            <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover" />
        </Head>
    )
}

export default CommonHead
