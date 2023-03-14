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
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../pages/LogIn_Register/AuthSlice";
import ChangePolicy from "../../pages/admin/ChangePolicy";
import CreateAccountSeller from "../../pages/admin/CreateAccountSeller";
import React from "react";
import PolicyIcon from "@mui/icons-material/Policy";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  queryCategory: (params: any) => void;
  navigateSeller: (route?: string) => void;
}

export default function LeftBavCategory(props: IProps) {
  const [openPolicy, setOpenPolicy] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const auth = useAppSelector(selectAuth);
  const theme = useTheme();
  return (
    <>
      <ChangePolicy open={openPolicy} setOpen={setOpenPolicy} />
      <CreateAccountSeller open={openCreate} setOpen={setOpenCreate} />
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
        {(auth.role === 1 || auth.role === 0 || true) && (
          <>
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
          </>
        )}
        {(auth.role === 0 || true) && (
          <>
            <List>
              <ListItem disablePadding sx={{ display: "block" }} onClick={() => setOpenPolicy(true)}>
                <ListItemButton sx={{ minHeight: 48, justifyContent: props.open ? "initial" : "center", px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: props.open ? 3 : "auto", justifyContent: "center" }}>
                    <PolicyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change Policy" sx={{ opacity: props.open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem disablePadding sx={{ display: "block" }} onClick={() => setOpenCreate(true)}>
                <ListItemButton sx={{ minHeight: 48, justifyContent: props.open ? "initial" : "center", px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: props.open ? 3 : "auto", justifyContent: "center" }}>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create account seller" sx={{ opacity: props.open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </>
        )}
      </MenuCategory>
    </>
  );
}
