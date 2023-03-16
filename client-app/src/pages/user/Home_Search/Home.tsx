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

export default function Home() {
  const [price, setPrice] = React.useState(-1);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [data, setData] = useState({});
  useEffect(() => {
    const category = searchParams.get("category");
    const keyword = searchParams.get("keyword");
    dispatch(changeLoading(true));
    searchProduct({ category, keyword })
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
  }, [searchParams, dispatch]);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "0 0 2rem 0" }}>
        <FormControl sx={{ width: "30%" }}>
          <InputLabel id="demo-simple-select-label">Price</InputLabel>
          <Select value={price} label="Age" onChange={(event) => setPrice(event.target.value as number)}>
            <MenuItem value={-1}>{`None`}</MenuItem>
            <MenuItem value={0}>{`Less than 5 (millions VND)`}</MenuItem>
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
