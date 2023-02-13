import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { HeaderApp, Search, SearchIconWrapper, StyledInputBase } from "../component/Header_Category/HeaderApp";
import { MenuCategory, ResponsiveMenuCategory } from "../component/Header_Category/MenuCategory";
import { listCategories } from "../constant/category/category";
import { Badge, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { UserRoute } from "../constant/route/name";
import LogIn from "./user/LogIn_Register/Login";
import Footer from '../component/Footer_category/Footer';


interface Props {
  children?: JSX.Element;
}

export default function Layout(props: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const signOut = () => {
    handleMenuClose();
    console.log("sign out");
  };

  const returnHome = () => {
    handleMenuClose();
    navigate(UserRoute.HOME);
  };

  const openCart = () => {
    handleMenuClose();
    navigate(UserRoute.USER_CART);
  };

  const openProfile = () => {
    handleMenuClose();
    navigate(UserRoute.USER_PROFILE);
  };

  const renderListCategories = (
    <MenuCategory variant="permanent" open={open}>
      <ResponsiveMenuCategory>
        <IconButton onClick={() => setOpen(false)}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </ResponsiveMenuCategory>
      <Divider />
      <List>
        {listCategories.map((category) => (
          <ListItem key={category.name} disablePadding sx={{ display: "block" }}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                {category.icon}
              </ListItemIcon>
              <ListItemText primary={category.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </MenuCategory>
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={openProfile}>Profile</MenuItem>
      <MenuItem onClick={signOut}>Log out</MenuItem>
      <MenuItem onClick={() => setOpenLogin(true)}>Log in</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={openCart}>
        <IconButton size="large" aria-label="shopping cart" color="inherit">
          <Badge badgeContent={99} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={openProfile}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={signOut}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Log out</p>
      </MenuItem>
      <MenuItem onClick={() => setOpenLogin(true)}>Log in</MenuItem>
    </Menu>
  );

  return (
    <>
      <LogIn openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HeaderApp position="fixed" open={open}>
          <Toolbar>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setOpen(true)}
                  edge="start"
                  sx={{ marginRight: 5, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" onClick={returnHome} sx={{ cursor: "pointer" }}>
                  E - Commerce
                </Typography>
              </Box>
              <Search sx={{ flexGrow: 3 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
              </Search>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
                <IconButton size="large" aria-label="shopping cart" color="inherit" onClick={openCart}>
                  <Badge badgeContent={99} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </HeaderApp>
        {renderMobileMenu}
        {renderMenu}
        {renderListCategories}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ResponsiveMenuCategory />

          {/* code data search in here */}
          {props.children}
        </Box>
        <Footer />
      </Box>
    </>
  );
}
