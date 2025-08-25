import { useState } from "react";
import "./App.css";
import FallbackLoading from "./components/loader/FallbackLoading.jsx";
// import { Route, Routes } from "react-router-dom";
// import { publicRoutes, privateRoutes, notFoundRoute } from "./routes";
// import { useSelector } from "react-redux";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>App</h1>
      <p>Lorem Ipsum</p>
      <div>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>Count</button>
      </div>
    </main>
  );
};

export default App;
