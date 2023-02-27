import React, { useState } from 'react';
import ProductItem from '../../component/Product/ProductItem';
import ProductDetails from '../../component/Product/ProductDetails';

export function Product() {
    return (
        <div>
            <h1>This is Product page</h1>
            <ProductItem/>
            <ProductDetails/>
        </div>
    )
}
