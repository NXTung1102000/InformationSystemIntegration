import DoneAllIcon from "@mui/icons-material/DoneAll";
import LaptopIcon from "@mui/icons-material/Laptop";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MouseIcon from "@mui/icons-material/Mouse";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { NameCategory, ParamCategory } from "./name";

interface category {
  name: string;
  icon: JSX.Element;
  param?: string;
}

export const listCategories: category[] = [
  { name: NameCategory.ALL, icon: <DoneAllIcon /> },
  { name: NameCategory.LAPTOP, icon: <LaptopIcon />, param: ParamCategory.LAPTOP },
  { name: NameCategory.MOBILE, icon: <SmartphoneIcon />, param: ParamCategory.MOBILE },
  { name: NameCategory.MOUSE, icon: <MouseIcon />, param: ParamCategory.MOUSE },
  { name: NameCategory.KEYBOARD, icon: <KeyboardIcon />, param: ParamCategory.KEYBOARD },
  { name: NameCategory.HEADPHONE, icon: <HeadphonesIcon />, param: ParamCategory.HEADPHONE },
];
