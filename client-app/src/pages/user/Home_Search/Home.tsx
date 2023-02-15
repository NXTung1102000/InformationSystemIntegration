import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProduct } from "../../../api/product";
import Category from "../../../component/category/Category";
import { NameCategory } from "../../../constant/category/name";

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
  const [searchParams, setSearchParams] = useSearchParams();
  // const data = dataCategory;
  const [data, setData] = useState({});
  // console.log("params", searchParams.get("category"));
  useEffect(() => {
    const category = searchParams.get("category");
    const keyword = searchParams.get("keyword");
    searchProduct({ category, keyword })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const tmp = groupBy(data.data, (product: any) => product.category);
        window.scrollTo(0, 0);
        setData(tmp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);
  return (
    <div>
      {listKeys(data)?.map((category) => (
        <Category key={category} name={category as NameCategory} productList={data[category as keyof object]} />
      ))}
    </div>
  );
}
