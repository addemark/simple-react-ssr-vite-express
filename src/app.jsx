import { useState, Suspense } from "react";
import "./App.css";
import FallbackLoading from "./components/loader/FallbackLoading.jsx";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, notFoundRoute } from "./routes";
// import { useSelector } from "react-redux";

function App() {
  // const userData = useSelector((state) => state.auth?.userData);
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Routes>
        {/* <Route element={<PrivateRoute userData={userData} />}>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element()}
            />
          ))}
        </Route> */}
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element()} />
        ))}
        <Route
          key={notFoundRoute.path}
          path={notFoundRoute.path}
          element={notFoundRoute.element()}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
