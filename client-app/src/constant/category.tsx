import DoneAllIcon from "@mui/icons-material/DoneAll";
import LaptopIcon from "@mui/icons-material/Laptop";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MouseIcon from "@mui/icons-material/Mouse";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import HeadphonesIcon from "@mui/icons-material/Headphones";

interface category {
  name: string;
  icon: JSX.Element;
}

export const listCategories: category[] = [
  { name: "all", icon: <DoneAllIcon /> },
  { name: "Laptop", icon: <LaptopIcon /> },
  { name: "Mobile", icon: <SmartphoneIcon /> },
  { name: "Mouse", icon: <MouseIcon /> },
  { name: "Keyboard", icon: <KeyboardIcon /> },
  { name: "HeadPhone", icon: <HeadphonesIcon /> },
];
