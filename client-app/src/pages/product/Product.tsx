import React, { useState } from 'react';
import '../../App.css'

import ProductModel from '../../model/ProductModel'
import ProductInfos from '../../component/Product/ProductInfos';
import ProductDetailsAndReviews from '../../component/Product/ProductDetailsAndReviews';
import { ProductImage } from "../../component/Product/product_item/ProductImage";
import ProductBuying from "../../component/Product/product_item/ProductBuying";


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
    specification: "Product specification",
    price: 1399,
    count: 10
  }

  return (
    <div className="product">
      <div className='product-image-and-infos'>
        <ProductImage productImage={product.image}/>
        <ProductInfos product={product}/>
      </div>
      <ProductBuying product={product}/>
      <ProductDetailsAndReviews/>
    </div>
  )
}
