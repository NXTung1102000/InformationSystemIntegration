import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { USER } from "../../../constant/order/status";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Order() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={USER.DELIVERING} />
          <Tab label={USER.DELIVERED} />
          <Tab label={USER.REJECTED} />
          <Tab label={USER.RETURNED} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {USER.DELIVERING}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {USER.DELIVERED}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {USER.REJECTED}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {USER.RETURNED}
      </TabPanel>
    </Box>
  );
}
