import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

let productName: string = 'Macbook Air M1'

export default function ProductRating() {
    const [value, setValue] = React.useState<number | null>(2);
    return (
        <div className='product-rating'>
            <h2>Ratings of the product</h2>
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        />
        </div>
    )
}
