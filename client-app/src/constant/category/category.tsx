import DoneAllIcon from "@mui/icons-material/DoneAll";
import LaptopIcon from "@mui/icons-material/Laptop";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MouseIcon from "@mui/icons-material/Mouse";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { NameCategory } from "./name";

interface category {
  name: string;
  icon: JSX.Element;
}

export const listCategories: category[] = [
  { name: NameCategory.ALL, icon: <DoneAllIcon /> },
  { name: NameCategory.LAPTOP, icon: <LaptopIcon /> },
  { name: NameCategory.MOBILE, icon: <SmartphoneIcon /> },
  { name: NameCategory.MOUSE, icon: <MouseIcon /> },
  { name: NameCategory.KEYBOARD, icon: <KeyboardIcon /> },
  { name: NameCategory.HEADPHONE, icon: <HeadphonesIcon /> },
];
