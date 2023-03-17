import DoneAllIcon from "@mui/icons-material/DoneAll";
import LaptopIcon from "@mui/icons-material/Laptop";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MouseIcon from "@mui/icons-material/Mouse";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { NameCategory, ParamCategory, TabSeller } from "./name";
import { SellerRoute } from "../route/name";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";

export interface TabRedirect {
  name: string;
  icon: JSX.Element;
  param?: string;
  route?: string;
}

export const listCategories: TabRedirect[] = [
  { name: NameCategory.ALL, icon: <DoneAllIcon /> },
  { name: NameCategory.LAPTOP, icon: <LaptopIcon />, param: ParamCategory.LAPTOP },
  { name: NameCategory.SMARTPHONE, icon: <SmartphoneIcon />, param: ParamCategory.SMARTPHONE },
  { name: NameCategory.MOUSE, icon: <MouseIcon />, param: ParamCategory.MOUSE },
  { name: NameCategory.KEYBOARD, icon: <KeyboardIcon />, param: ParamCategory.KEYBOARD },
];

export const listTabSeller: TabRedirect[] = [
  { name: TabSeller.DASHBOARD, icon: <DashboardIcon />, route: SellerRoute.SELLER_DASHBOARD },
  { name: TabSeller.CATEGORY, icon: <CategoryIcon />, route: SellerRoute.SELLER_CATEGORY },
  { name: TabSeller.PRODUCT, icon: <InventoryIcon />, route: SellerRoute.SELLER_PRODUCT },
  { name: TabSeller.ORDER, icon: <ShoppingCartIcon />, route: SellerRoute.SELLER_ORDER },
];
