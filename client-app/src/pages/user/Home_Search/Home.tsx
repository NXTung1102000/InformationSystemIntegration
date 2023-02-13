import { useSearchParams } from "react-router-dom";
import Category from "../../../component/category/Category";
import { dataCategory } from "./dummyDataProduct";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = dataCategory;
  // console.log(searchParams.get("category"));
  return (
    <div>
      {data?.map((category) => (
        <Category key={category.name} name={category.name} productList={category.productList} />
      ))}
    </div>
  );
}
