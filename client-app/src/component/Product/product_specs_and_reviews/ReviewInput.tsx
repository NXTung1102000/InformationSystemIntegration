import React, { useState } from 'react';
import '../../../App.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating';

import {ProductModel} from '../../../model/ProductModel'

export function ReviewInput({reviewerName}: {reviewerName: string}) {
  return (
    <div className="review-input">
      <h3>{reviewerName}</h3>
      <Rating
        name="rating-input"
      />
      <TextField variant="outlined" fullWidth multiline maxRows={4}/>
      <Button variant='outlined'>Submit</Button>
    </div>
  )
}