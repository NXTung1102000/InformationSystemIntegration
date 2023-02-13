import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Counter } from "../pages/counter/Counter";
import { Product } from "../pages/product/Product";
import { PrivateRouter, PublicRouter } from "../constant/route/route";
import Layout from "../pages/Layout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRouter.map((router) => (
          <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
        ))}

        {
          // role is admin
          PrivateRouter.map((privateRouter) => (
            <Route
              key={privateRouter.router}
              path={privateRouter.router}
              element={<Layout>{privateRouter.component}</Layout>}
            />
          ))
        }
        <Route path="/counter" element={<Counter />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
