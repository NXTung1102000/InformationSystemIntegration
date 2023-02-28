import React, { useState } from 'react';

let productName: string = 'Macbook Air M1'

export default function Price({productPrice}: {productPrice: number}) {
    return (
        <div className='product-price'>
         <p>Price: ${productPrice}</p>
        </div>
    )
}
