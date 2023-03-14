import React, { useState } from 'react';

let productName: string = 'Macbook Air M1'

export default function Quantity({productCount}: {productCount: number}) {
    return (
        <div className='count'>
          <p>Quantity: {productCount}</p>
        </div>
    )
}
