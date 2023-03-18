import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { USER } from "../../../constant/order/status";
import DetailOrder from "./DetailOrder";
import { getNameStatus } from "../../../util/utilsForOrder";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function OrderList() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={getNameStatus(USER.DELIVERING)} />
          <Tab label={getNameStatus(USER.DELIVERED)} />
          <Tab label={getNameStatus(USER.REJECTED)} />
          <Tab label={getNameStatus(USER.RETURNED)} />
          <Tab label={getNameStatus(USER.CANCEL)} />
          <Tab label={getNameStatus(USER.SUCCESS)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DetailOrder status={USER.DELIVERING} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DetailOrder status={USER.DELIVERED} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DetailOrder status={USER.REJECTED} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DetailOrder status={USER.RETURNED} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DetailOrder status={USER.CANCEL} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <DetailOrder status={USER.SUCCESS} />
      </TabPanel>
    </Box>
  );
}
