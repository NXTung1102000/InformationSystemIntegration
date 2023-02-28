import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { MenuCategory, ResponsiveMenuCategory } from "./MenuCategory";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { listCategories, listTabSeller } from "../../constant/tabRedirect/tabRedirect";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  queryCategory: (params: any) => void;
  navigateSeller: (route?: string) => void;
}

export default function LeftBavCategory(props: IProps) {
  const theme = useTheme();
  return (
    <MenuCategory variant="permanent" open={props.open}>
      <ResponsiveMenuCategory>
        <IconButton onClick={() => props.setOpen(false)}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </ResponsiveMenuCategory>
      <Divider />
      <List>
        {listCategories.map((category) => (
          <ListItem
            key={category.name}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => props.queryCategory({ category: category.param })}
          >
            <ListItemButton sx={{ minHeight: 48, justifyContent: props.open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: props.open ? 3 : "auto", justifyContent: "center" }}>
                {category.icon}
              </ListItemIcon>
              <ListItemText primary={category.name} sx={{ opacity: props.open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {listTabSeller.map((tab) => (
          <ListItem
            key={tab.name}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => props.navigateSeller(tab.route)}
          >
            <ListItemButton sx={{ minHeight: 48, justifyContent: props.open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: props.open ? 3 : "auto", justifyContent: "center" }}>
                {tab.icon}
              </ListItemIcon>
              <ListItemText primary={tab.name} sx={{ opacity: props.open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </MenuCategory>
  );
}
