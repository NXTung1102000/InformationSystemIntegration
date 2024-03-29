import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { ProductModel } from "../../model/ProductModel";
import Specs from "./product_specs_and_reviews/Specs";
import { Review } from "./product_specs_and_reviews/Review";
import { ReviewInput } from "./product_specs_and_reviews/ReviewInput";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function ProductSpecsAndReviews({product, productReviews}:{product: ProductModel, productReviews: Array<object>}) {

  const [value, setValue] = React.useState(0);
  let reviewerName: string = 'Tran Thi B'

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className="product-details-and-reviews">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <p>{product.description}</p>
        {/*<Specs productSpecs={JSON.parse(product.specification)}/>*/}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReviewInput reviewerName={reviewerName}/>
        {productReviews.map((review) => (
          <Review productReviews={review}/>
        ))}
      </TabPanel>
    </Box>
  );
}
