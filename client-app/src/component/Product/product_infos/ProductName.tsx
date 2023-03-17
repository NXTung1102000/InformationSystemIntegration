import React, { useState } from 'react';

let productName: string = 'Macbook Air M1'

export default function ProductName({productName}:{productName: string}) {
    return (
        <div className='product-name'>
            <h2>{productName}</h2>
        </div>
    )
}
