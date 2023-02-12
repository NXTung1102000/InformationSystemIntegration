import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderApp, Search, SearchIconWrapper, StyledInputBase } from "../component/Header_Category/HeaderApp";
import { ResponsiveMenuCategory } from "../component/Header_Category/MenuCategory";
import { Badge } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createSearchParams, useNavigate } from "react-router-dom";
import { UserRoute } from "../constant/route/name";
import LogIn from "./LogIn_Register/Login";
import LeftBavCategory from "../component/Header_Category/LeftBavCategory";
import { MenuUser, MenuUserMobile } from "../component/Header_Category/MenuUser";
import { useAppSelector } from "../app/hooks";
import { selectCart } from "./user/cart/CartSlice";
import Footer from "../component/Footer_category/Footer";

interface Props {
  children?: JSX.Element;
}

export default function Layout(props: Props) {
  const navigate = useNavigate();
  const cart = useAppSelector(selectCart);
  const numProduct: number = cart.itemsList.length;
  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState("");

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputSearch(event.target.value);
  };

  const clickEnterToSearch = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log(inputSearch);
    }
  };

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

  const queryCategory = (params: any) => {
    if (params.category) {
      navigate({
        pathname: UserRoute.HOME,
        search: `?${createSearchParams(params)}`,
      });
    } else {
      navigate(UserRoute.HOME);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

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

  return (
    <>
      <LogIn openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <Box sx={{ display: "flex" }}>
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
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={inputSearch}
                  onChange={handleInputSearch}
                  onKeyUp={clickEnterToSearch}
                />
              </Search>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
                <IconButton size="large" aria-label="shopping cart" color="inherit" onClick={openCart}>
                  <Badge badgeContent={numProduct} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
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
        <MenuUser
          anchorEl={anchorEl}
          signOut={signOut}
          openProfile={openProfile}
          setOpenLogin={setOpenLogin}
          handleMenuClose={handleMenuClose}
        />
        <MenuUserMobile
          numProduct={numProduct}
          mobileMoreAnchorEl={mobileMoreAnchorEl}
          signOut={signOut}
          openProfile={openProfile}
          setOpenLogin={setOpenLogin}
          handleMobileMenuClose={handleMobileMenuClose}
          openCart={openCart}
        />
        <LeftBavCategory open={open} setOpen={setOpen} queryCategory={queryCategory} />
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
