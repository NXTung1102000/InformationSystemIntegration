import React, { useState } from 'react';
import {ProductModel} from "../../../model/ProductModel";
import Grid from '@mui/material/Grid'

import Price from './product_buying/Price'
import Quantity from './product_buying/Quantity'
import Count from './product_buying/Count'
import AddToCart from "./product_buying/AddToCart";
import { NameCategory } from "../../../constant/tabRedirect/name";
import { ICartItem } from "../../../constant/cart/cart";

let productName: string = 'Macbook Air M1'

export default function ProductBuying(props: ICartItem) {
    return (
        <Grid container className='product-buying'>
          <Grid item md={5} className='product-price-quantity-count'>
            <Price productPrice={props.price}/>
            <Quantity productCount={props.quantity}/>
            {/*<Count/>*/}
          </Grid>
          <Grid item md={7}>
            <AddToCart
              id={props.id}
              name={props.name}
              price={props.price}
              category={String(props.category) as NameCategory}
              description={props.description}
              star={props.star}
              image={props.image}
              quantity={props.quantity}
              quantityInCart={props.quantityInCart}
            />
          </Grid>
        </Grid>
    )
}
