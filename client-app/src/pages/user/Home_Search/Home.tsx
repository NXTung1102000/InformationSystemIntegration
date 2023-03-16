import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProduct } from "../../../api/product";
import { useAppDispatch } from "../../../app/hooks";
import Category from "../../../component/category/Category";
import { changeLoading } from "../../../component/LoadingAndNotice/loadingSlice";
import { NameCategory } from "../../../constant/tabRedirect/name";
import React from "react";

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

const listKeys = (row: object) => {
  return Object.keys(row);
};

const getMinMaxPrice = (value: number) => {
  let price_min = "";
  let price_max = "";
  switch (value) {
    case 0:
      price_min = "0";
      price_max = "2000000";
      break;
    case 2:
      price_min = "2000000";
      price_max = "5000000";
      break;
    case 5:
      price_min = "5000000";
      price_max = "10000000";
      break;
    case 10:
      price_min = "10000000";
      price_max = "20000000";
      break;
    case 20:
      price_min = "20000000";
      break;
  }
  return { price_min, price_max };
};

export default function Home() {
  const [price, setPrice] = React.useState(-1);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [data, setData] = useState({});
  useEffect(() => {
    const category = searchParams.get("category");
    const keyword = searchParams.get("keyword");
    const getPrice = getMinMaxPrice(price);
    if (category && keyword && getPrice) dispatch(changeLoading(true));
    searchProduct({ category, keyword, price_min: getPrice.price_min, price_max: getPrice.price_max })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const tmp = groupBy(data.data, (product: any) => product.category);
        window.scrollTo(0, 0);
        setData(tmp);
        dispatch(changeLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(changeLoading(false));
      });
  }, [searchParams, dispatch, price]);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "0 0 2rem 0" }}>
        <FormControl sx={{ width: "30%" }}>
          <InputLabel id="demo-simple-select-label">Price</InputLabel>
          <Select value={price} label="Age" onChange={(event) => setPrice(event.target.value as number)}>
            <MenuItem value={-1}>{`None`}</MenuItem>
            <MenuItem value={0}>{`Less than 2 (millions VND)`}</MenuItem>
            <MenuItem value={2}>{`From 2 to 5 (millions VND)`}</MenuItem>
            <MenuItem value={5}>{`From 5 to 10 (millions VND)`}</MenuItem>
            <MenuItem value={10}>{`From 10 to 20 (millions VND)`}</MenuItem>
            <MenuItem value={20}>{`Greater than 20 (millions VND)`}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {listKeys(data)?.map((category) => (
        <Category key={category} name={category as NameCategory} productList={data[category as keyof object]} />
      ))}
    </Box>
  );
}
