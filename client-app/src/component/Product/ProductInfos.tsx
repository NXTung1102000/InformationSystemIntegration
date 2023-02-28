import React, { useState } from 'react';
// import './App.css'
import ProductModel from '../../model/ProductModel'

import ProductName from './product_item/ProductName';
import ProductRating from './product_item/ProductRating';
import ProductDescription from './product_item/ProductDescription';

export default function ProductInfos({product}: {product: ProductModel}) {
    return (
        <div className='product-infos'>
            <ProductName productName={product.name}/>
            <ProductRating productRating={product.rating}/>
            <ProductDescription productDescription={product.description}/>
        </div>
    )
}