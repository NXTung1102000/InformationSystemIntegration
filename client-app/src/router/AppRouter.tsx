import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Counter } from "../pages/counter/Counter";
import { Product } from "../pages/user/product/Product";
import { PrivateRouter, PublicRouter } from "../constant/route/route";
import Layout from "../pages/Layout";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../pages/LogIn_Register/AuthSlice";

const AppRouter = () => {
  const auth = useAppSelector(selectAuth);
  return (
    <BrowserRouter>
      <Routes>
        {PublicRouter.map((router) => (
          <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
        ))}

        {(auth.role === 1 || auth.role === 2) &&
          PrivateRouter.map((privateRouter) => (
            <Route
              key={privateRouter.router}
              path={privateRouter.router}
              element={<Layout>{privateRouter.component}</Layout>}
            />
          ))}
        <Route path="/counter" element={<Counter />} />
        <Route path="/product" element={
            <Layout><Product /></Layout>
          } />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
