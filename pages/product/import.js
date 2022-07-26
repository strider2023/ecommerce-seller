import React, { useState } from 'react';
import AppContainer from '../../containers/AppContainer';
import Link from 'next/link';
import DragDropFile from '../../common/components/DragDropFile';

function ProductImport() {
    const fileTypes = ["XLSX"];
    const [file, setFile] = useState(null);

    const handleChange = (files) => {
        setFile(files);
    };

    return (
        <AppContainer {...{ name: 'Import', description: 'Import data from Excel files.', showBack: true }}>
            <DragDropFile handleFiles={onFileUpload} name="file" types={fileTypes}/>
            <Link href="../files/LehLah_Product_Import.xlsx" passHref>
                <p style={{ cursor: 'pointer' }}>Download Sample Import File</p>
            </Link>
        </AppContainer>
    )
}

export default ProductImport