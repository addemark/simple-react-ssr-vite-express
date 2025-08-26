import { Helmet } from "react-helmet";
import { getTitleFromRoute } from "./utils/docTitle";
import { useLocation } from "react-router";
import App from "./app";
import React, { useEffect, useState } from "react";
import CommonLoading from "./components/loader/CommonLoading.jsx";
import axios from "axios";
import createAppStore, { createAppStoreAsync } from "@/redux/store";
import { Provider } from "react-redux";

const ErrorComponent = ({ errorMessage }) => (
  <div className="text-red-500 font-bold text-center">{errorMessage}</div>
);

export default function AppContainer({ ssrStore = null }) {
  const location = useLocation();

  // Initialize store immediately for client-side to avoid null store issues
  const [store, setStore] = useState(() => {
    if (ssrStore) return ssrStore;
    if (typeof window !== "undefined") {
      // On client-side, create store immediately with preloaded state
      const preloadedState = window.__PRELOADED_STATE__ || {};
      if (window.__PRELOADED_STATE__) {
        delete window.__PRELOADED_STATE__;
      }
      return createAppStore(preloadedState);
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await axios.get("/server-status");
      } catch (err) {
        setError("Server is down. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    checkServerStatus();
  }, []);

  // Optional: Add any async initialization logic here if needed
  useEffect(() => {
    if (store && typeof window !== "undefined") {
      // Any additional async setup can go here
      // For example, dispatching initial data fetching actions
    }
  }, [store]);

  // For SSR, create store synchronously if not provided
  if (typeof window === "undefined" && !store) {
    const ssrStoreInstance = createAppStore();
    return (
      <React.StrictMode>
        <Helmet>
          <title>{getTitleFromRoute(location.pathname)}</title>
        </Helmet>
        <Provider store={ssrStoreInstance}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  }

  if (loading || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        {loading ? (
          <CommonLoading />
        ) : (
          <ErrorComponent errorMessage={error || ""} />
        )}
      </div>
    );
  }

  return (
    <React.StrictMode>
      <Helmet>
        <title>{getTitleFromRoute(location.pathname)}</title>
      </Helmet>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
