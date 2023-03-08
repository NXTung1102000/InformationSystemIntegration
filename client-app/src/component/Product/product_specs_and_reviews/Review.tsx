import React, { useState } from 'react';
import '../../../App.css'
import Rating from '@mui/material/Rating';

import {ProductModel} from '../../../model/ProductModel'

export function Review({productReview}: {productReview: object}) {
  return (
    <div className="product-single-review">
      <div class>
        <p>{productReview['username' as keyof typeof productReview]}</p>
        <p>{productReview['date' as keyof typeof productReview]}</p>
        <Rating
          name="product-rating"
          value={productReview['star' as keyof typeof productReview]}
        />
      </div>
      <div>
        <p>{productReview['content' as keyof typeof productReview]}</p>
      </div>
    </div>
  )

}