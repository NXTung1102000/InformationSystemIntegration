import React, { useState } from 'react';
import Button from "@mui/material/Button";

import { addToCart } from "../../../../pages/user/cart/CartSlice";
import { ICartItem } from "../../../../constant/cart/cart";
import { useAppDispatch } from "../../../../app/hooks";

let productName: string = 'Macbook Air M1'

export default function AddToCart(prop: ICartItem) {
  const dispatch = useAppDispatch()

  const addToYourCart = (item: ICartItem) => {
    const card = { ...item, quantityInCart: 1 };
    dispatch(addToCart(card));
};

    return (
        <div className='button-add-to-cart'>
          <Button variant="contained" size="large" onClick={() => addToYourCart(prop)}>
            Add to cart
          </Button>
        </div>
    )
}
