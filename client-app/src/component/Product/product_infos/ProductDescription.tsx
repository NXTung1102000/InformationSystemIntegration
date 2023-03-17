import React, { useState } from 'react';

let productName: string = 'Macbook Air M1'

export default function ProductDescription({productDescription}: {productDescription: string}) {
    return (
      <div className='product-description'>
        <p>{productDescription}</p>
      </div>
    )
}
