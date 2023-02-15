import Cart from "../../pages/user/cart/Cart";
import HistoryOrder from "../../pages/user/HistoryOrder/HistoryOrder";
import Home from "../../pages/user/Home_Search/Home";
import Profile from "../../pages/user/Profile/Profile";
import { UserRoute } from "./name";

export interface Router_Component {
  router: string;
  component: JSX.Element;
}

export const PublicRouter: Router_Component[] = [
  { router: UserRoute.HOME, component: <Home /> },
  { router: UserRoute.USER_PROFILE, component: <Profile /> },
  { router: UserRoute.USER_CART, component: <Cart /> },
  { router: UserRoute.USER_HISTORY, component: <HistoryOrder /> },
  // define router
];

export const PrivateRouter: Router_Component[] = [
  //define router
];
