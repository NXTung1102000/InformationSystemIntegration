import React, { useState } from 'react';
import Rating from '@mui/material/Rating';

let productName: string = 'Macbook Air M1'

export default function ProductRating({productRating}: {productRating: number}) {
    // const [value, setValue] = React.useState<number | null>(2);
    const value: number = productRating
    return (
        <div className='product-rating'>
            <Rating
                name="simple-controlled"
                value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
            />
        </div>
    )
}
