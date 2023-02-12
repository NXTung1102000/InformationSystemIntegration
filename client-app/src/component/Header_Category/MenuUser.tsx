import { AccountCircle } from "@mui/icons-material";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface IProps {
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  openProfile: () => void;
  signOut: () => void;
  setOpenLogin: (open: boolean) => void;
}

export function MenuUser(props: IProps) {
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
      <MenuItem onClick={props.openProfile}>Profile</MenuItem>
      <MenuItem onClick={props.signOut}>Log out</MenuItem>
      <MenuItem onClick={() => props.setOpenLogin(true)}>Log in</MenuItem>
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
      <MenuItem onClick={props.openProfile}>
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
      <MenuItem onClick={props.signOut}>
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
      <MenuItem onClick={() => props.setOpenLogin(true)}>Log in</MenuItem>
    </Menu>
  );
}
