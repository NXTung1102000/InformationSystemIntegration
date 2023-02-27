import React, { useState } from 'react';

let productName: string = 'Macbook Air M1'

export default function ProductProperties() {
    return (
        <ul className='product-properties'>
            <li>Property 1</li>
            <li>Property 2</li>
            <li>Property 3</li>
        </ul>
    )
}
