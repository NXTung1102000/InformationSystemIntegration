import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProduct } from "../../../api/product";
import { useAppDispatch } from "../../../app/hooks";
import Category from "../../../component/category/Category";
import { changeLoading } from "../../../component/LoadingAndNotice/loadingSlice";
import { NameCategory } from "../../../constant/tabRedirect/name";

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
    <div>
      {listKeys(data)?.map((category) => (
        <Category key={category} name={category as NameCategory} productList={data[category as keyof object]} />
      ))}
    </div>
  );
}
