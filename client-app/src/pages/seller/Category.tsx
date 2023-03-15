import React from "react";
import { useAppDispatch } from "../../app/hooks";
import TableComponent from "../../component/table/TableComponent";
import { NameCategory } from "../../constant/tabRedirect/name";

const header = ["Name category", "Number of products", "Total"];
interface IDataCategory {
  name: string;
  numProduct: number;
  total: number;
}

const initData: IDataCategory[] = [
  { name: NameCategory.HEADPHONE, numProduct: 10, total: 90147000 },
  { name: NameCategory.KEYBOARD, numProduct: 10, total: 90147000 },
  { name: NameCategory.LAPTOP, numProduct: 10, total: 90147000 },
  { name: NameCategory.MOUSE, numProduct: 10, total: 90147000 },
  { name: NameCategory.SMARTPHONE, numProduct: 10, total: 90147000 },
];

export default function Category() {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IDataCategory[]>(initData);

  // React.useEffect(() => {
  //   dispatch(changeLoading(true));
  //   callAPI()
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .then((data) => {
  //       setData(data.data);
  //       dispatch(changeLoading(false));
  //     })
  //     .catch((error) => {
  //       dispatch(changeLoading(false));
  //       console.log(error);
  //     });
  // }, [dispatch]);

  const mapData = () => {
    return data?.map((item) => {
      return {
        name: item.name,
        numProduct: item.numProduct,
        total: item.total,
      };
    });
  };

  return <TableComponent header={header} data={mapData()} />;
}
