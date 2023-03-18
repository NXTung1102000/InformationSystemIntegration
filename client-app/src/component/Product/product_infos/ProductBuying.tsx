import React, { useState } from 'react';
import {ProductModel} from "../../../model/ProductModel";
import Grid from '@mui/material/Grid'

import Price from './product_buying/Price'
import Quantity from './product_buying/Quantity'
import Count from './product_buying/Count'
import AddToCart from "./product_buying/AddToCart";
import { NameCategory } from "../../../constant/tabRedirect/name";

let productName: string = 'Macbook Air M1'

export default function ProductBuying({product}: {product: ProductModel}) {
    return (
        <Grid container className='product-buying'>
          <Grid item md={5} className='product-price-quantity-count'>
            <Price productPrice={product.price}/>
            <Quantity productCount={product.quantity}/>
            {/*<Count/>*/}
          </Grid>
          <Grid item md={7}>
            <AddToCart
              id={product.id}
              name={product.name}
              price={product.price}
              category={String(product.category) as NameCategory}
              description={product.description}
              star={product.star}
              image={`http://localhost:5000/show?filename=${product.image}`}
              quantity={1}
              quantityInCart={0}
            />
          </Grid>
        </Grid>
    )
}
