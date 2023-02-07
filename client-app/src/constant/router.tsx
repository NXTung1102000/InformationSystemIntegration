import Home from "../pages/Home_Search/Home";
import Profile from "../pages/Profile/Profile";

export const Router_SearchOnline = "/search-online";
export const Router_Profile = "/profile";

export interface Router_Component {
  router: string;
  component: JSX.Element;
}

export const PublicRouter: Router_Component[] = [
  { router: "/", component: <Home /> },
  { router: Router_Profile, component: <Profile /> },
];

export const PrivateRouter: Router_Component[] = [];
