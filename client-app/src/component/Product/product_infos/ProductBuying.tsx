import React, { useState } from 'react';
import {ProductModel} from "../../../model/ProductModel";

import Price from './product_buying/Price'
import Quantity from './product_buying/Quantity'
import Count from './product_buying/Count'
import AddToCart from "./product_buying/AddToCart";

let productName: string = 'Macbook Air M1'

export default function ProductBuying({product}: {product: ProductModel}) {
    return (
        <div className='product-buying'>
          <div>
            <Price productPrice={product.price}/>
            <Quantity productCount={product.quantity}/>
            <Count/>
          </div>
          <AddToCart/>
        </div>
    )
}
