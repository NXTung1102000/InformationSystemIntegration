import { AccountCircle } from "@mui/icons-material";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../pages/LogIn_Register/AuthSlice";
import LoginIcon from "@mui/icons-material/Login";

interface IProps {
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  openProfile: () => void;
  signOut: () => void;
  setOpenLogin: (open: boolean) => void;
}

export function MenuUser(props: IProps) {
  const auth = useAppSelector(selectAuth);
  const isLogIn = () => {
    if (auth.token) return true;
    return false;
  };
  return (
    <Menu
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(props.anchorEl)}
      onClose={props.handleMenuClose}
    >
      {isLogIn() && <MenuItem onClick={props.openProfile}>Profile</MenuItem>}
      {isLogIn() && <MenuItem onClick={props.signOut}>Log out</MenuItem>}
      {!isLogIn() && (
        <MenuItem
          onClick={() => {
            props.setOpenLogin(true);
            props.handleMenuClose();
          }}
        >
          Log in
        </MenuItem>
      )}
    </Menu>
  );
}

interface IPropsMobile {
  numProduct: number;
  mobileMoreAnchorEl: null | HTMLElement;
  openProfile: () => void;
  signOut: () => void;
  setOpenLogin: (open: boolean) => void;
  handleMobileMenuClose: () => void;
  openCart: () => void;
}

export function MenuUserMobile(props: IPropsMobile) {
  const auth = useAppSelector(selectAuth);
  const isLogIn = () => {
    if (auth.token) return true;
    return false;
  };
  return (
    <Menu
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(props.mobileMoreAnchorEl)}
      onClose={props.handleMobileMenuClose}
    >
      <MenuItem onClick={props.openCart}>
        <IconButton size="large" aria-label="shopping cart" color="inherit">
          <Badge badgeContent={props.numProduct} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {isLogIn() && (
        <MenuItem onClick={props.openProfile}>
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      )}
      {isLogIn() && (
        <MenuItem onClick={props.signOut}>
          <IconButton size="large" color="inherit">
            <LogoutIcon />
          </IconButton>
          <p>Log out</p>
        </MenuItem>
      )}
      {!isLogIn() && (
        <MenuItem
          onClick={() => {
            props.setOpenLogin(true);
            props.handleMobileMenuClose();
          }}
        >
          <IconButton size="large" color="inherit">
            <LoginIcon />
          </IconButton>
          <p>Log in</p>
        </MenuItem>
      )}
    </Menu>
  );
}
