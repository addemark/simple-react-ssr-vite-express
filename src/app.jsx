import { useState } from "react";
import "./App.css";
import FallbackLoading from "./components/loader/FallbackLoading.jsx";
// import { Route, Routes } from "react-router-dom";
// import { publicRoutes, privateRoutes, notFoundRoute } from "./routes";
// import { useSelector } from "react-redux";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          App
        </h1>
        <p className="text-gray-600 mb-6 text-center">Lorem Ipsum</p>
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-800 mb-4">
            {count}
          </div>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Count
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
