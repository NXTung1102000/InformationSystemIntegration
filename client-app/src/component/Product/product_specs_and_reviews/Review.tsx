import React, { useState } from 'react';
import '../../../App.css'
import Rating from '@mui/material/Rating';

import {ProductModel} from '../../../model/ProductModel'

export function Review({productReviews}: {productReviews: object}) {
  return (
    <div className="product-single-review">
      <div className="review-username">
        <p>{productReviews['username' as keyof typeof productReviews]}</p>
        <p>{productReviews['date' as keyof typeof productReviews]}</p>
        <Rating
          name="product-rating"
          value={productReviews['star' as keyof typeof productReviews]}
        />
      </div>
      <div className="review-content">
        <p>{productReviews['content' as keyof typeof productReviews]}</p>
      </div>
    </div>
  )
}