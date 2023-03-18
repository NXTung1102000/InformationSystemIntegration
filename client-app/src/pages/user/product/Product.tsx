import React, { useState } from "react";
import "../../../App.css";

import { ProductModel } from "../../../model/ProductModel";
import ProductInfos from "../../../component/Product/ProductInfos";
import ProductSpecsAndReviews from "../../../component/Product/ProductSpecsAndReviews";
import { ProductImage } from "../../../component/Product/ProductImage";
import ProductBuying from "../../../component/Product/product_infos/ProductBuying";
import { useSearchParams } from "react-router-dom";
import { getProductByID } from "../../../api/product";
import { useAppDispatch } from "../../../app/hooks";
import { changeNotice } from "../../../component/LoadingAndNotice/noticeSlice";
import CardMedia from "@mui/material/CardMedia";
import { NameCategory } from "../../../constant/tabRedirect/name";


const productModel: ProductModel = {
    id: 0,
    image: "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gold-600x600.jpg",
    name: "MacBook Air M1 2020",
    category: 1,
    star: 4,
    detail: `
      MacBook Air 13.3" with Retina Display
      16-core Neural Engine
      16GB unified memory
      512GB SSD storage
      NOTE: Products with electrical plugs are
      designed for use in the US. Outlets and
      voltage differ internationally and ...
    `,
    description: `
      MacBook AirPower. It's in the Air.Our thinnest, lightest notebook, completely transformed by the Apple M1 chip. CPU speeds up to 3.5x faster. GPU speeds up to 5x faster. Our most advanced Neural Engine for up to 9x faster machine learning. The longest battery life ever in a MacBook Air. And a silent, fanless design ...
    `,
    // specification: {
    //   "Display Size": "13'3 inches",
    //   Processor: " 3.2 GHz others",
    //   RAM: "16 GB",
    //   "Hard Drive": "512 GB SSD",
    //   "Graphics Coprocessor": "M1",
    //   "Graphics Card Ram": "6 GB",
    // },
    specification: '',
    price: 1399,
    quantity: 10,
  };


export function Product() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();


  let [product, setProduct] = useState(productModel);

  React.useEffect(() => {
    const idProduct = searchParams.get("id");
    if (idProduct) {
      getProductByID(idProduct)
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          const result = response.data[0];
          console.log(result)
          setProduct(result)
        })
        .catch((err) => {
          dispatch(changeNotice({ message: err.message, open: true, type: "error" }));
        });
    }
  }, [dispatch, searchParams]);


  let productReview: object = {
    username: "Nguyen Van A",
    star: 4,
    content: "This product is good for business",
    date: "01/01/2023",
  };
  let productReviews = Array.from([1, 2, 3, 4], (_) => productReview);

  let image = `http://localhost:5000/show?filename=${product.image}`
  // product.specification = JSON.parse(product.specification)
  // let spec = JSON.parse(product.specification)
  // console.log(spec)

  return (
    <div className="product">
      <div className="product-image-and-infos">
        <CardMedia sx={{ maxWidth: "100%", height: 450 }} component="img" src={image} alt={product.name} />
        <ProductInfos product={product} />
      </div>
      {/*<ProductBuying product={product} />*/}
      <ProductBuying
        id={product.id}
        name={product.name}
        price={product.price}
        category={String(product.category) as NameCategory}
        description={product.description}
        star={product.star}
        image={`http://localhost:5000/show?filename=${product.image}`}
        quantity={1}
        quantityInCart={0}
      />
      <ProductSpecsAndReviews product={product} productReviews={productReviews} />
    </div>
  );
}
