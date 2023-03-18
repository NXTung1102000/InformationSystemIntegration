import React, { useState } from 'react';
// import './App.css'
import {ProductModel} from '../../model/ProductModel'

import ProductName from './product_infos/ProductName';
import ProductRating from './product_infos/ProductRating';
import ProductDescription from './product_infos/ProductDescription';

export default function ProductInfos({product}: {product: ProductModel}) {
    return (
        <div className='product-infos'>
            <ProductName productName={product.name}/>
            <ProductRating productRating={product.star}/>
            <ProductDescription productDescription={product.description}/>
        </div>
    )
}