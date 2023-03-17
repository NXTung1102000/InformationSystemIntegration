import React, { useState } from 'react';
import {ProductModel} from "../../model/ProductModel";
import { resolveSrv } from "dns";

export function ProductImage({productImage}: {productImage: string}) {
  return (
    <div className="product-image">
       <img
         src = {productImage}
         alt = "new"
       />
    </div>
  )
}