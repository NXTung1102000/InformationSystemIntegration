import React, { useState } from 'react';
// import './App.css'

import ProductName from './product_item/ProductName';
import ProductRating from './product_item/ProductRating';
import ProductProperties from './product_item/ProductProperties';


export default function ProductItem() {
    return (
        <div className='product-item'>
            <p className='product-image'>Product Image</p>
            <ProductName/>
            <ProductRating/>
            <ProductProperties/>
        </div>
    )
}