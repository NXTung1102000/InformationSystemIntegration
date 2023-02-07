import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Counter } from "../pages/counter/Counter";
import { PrivateRouter, PublicRouter } from "../constant/router";
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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
