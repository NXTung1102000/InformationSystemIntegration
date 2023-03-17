import React, { useState } from 'react';
import Button from "@mui/material/Button";


let productName: string = 'Macbook Air M1'

export default function AddToCart() {
    return (
        <div className='button-add-to-cart'>
          <Button>Add to cart</Button>
        </div>
    )
}
