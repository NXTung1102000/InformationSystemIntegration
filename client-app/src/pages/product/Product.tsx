import React, { useState } from 'react';
import '../../App.css'

import {ProductModel} from '../../model/ProductModel'
import ProductInfos from '../../component/Product/ProductInfos';
import ProductSpecsAndReviews from '../../component/Product/ProductSpecsAndReviews';
import { ProductImage } from "../../component/Product/ProductImage";
import ProductBuying from "../../component/Product/product_infos/ProductBuying";


export function Product() {
  const product: ProductModel = {
    image: "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gold-600x600.jpg",
    name: "MacBook Air M1 2020",
    rating: 4,
    description:  `
      MacBook Air 13.3" with Retina Display 
      16-core Neural Engine
      16GB unified memory
      512GB SSD storage
      NOTE: Products with electrical plugs are 
      designed for use in the US. Outlets and 
      voltage differ internationally and ...
    `,
    detail: `
      MacBook AirPower. It's in the Air.Our thinnest, lightest notebook, completely transformed by the Apple M1 chip. CPU speeds up to 3.5x faster. GPU speeds up to 5x faster. Our most advanced Neural Engine for up to 9x faster machine learning. The longest battery life ever in a MacBook Air. And a silent, fanless design ...
    `,
    specification: {
      "Display Size": "13'3 inches",
      "Processor": " 3.2 GHz others",
      "RAM": "16 GB",
      "Hard Drive": "512 GB SSD",
      "Graphics Coprocessor": "M1",
      "Graphics Card Ram": "6 GB",
    },
    price: 1399,
    quantity: 10
  }

  return (
    <div className="product">
      <div className='product-image-and-infos'>
        <ProductImage productImage={product.image}/>
        <ProductInfos product={product}/>
      </div>
      <ProductBuying product={product}/>
      <ProductSpecsAndReviews product={product}/>
    </div>
  )
}
