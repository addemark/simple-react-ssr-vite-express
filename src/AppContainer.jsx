import { I18nextProvider } from "react-i18next";
import { Helmet } from "react-helmet";
import { getTitleFromRoute } from "./utils/docTitle";
import { useLocation } from "react-router";
import App from "./app";
import React, { useState } from "react";
import CommonLoading from "./components/loader/CommonLoading.jsx";

const ErrorComponent = ({ errorMessage }) => (
  <div className="text-red-500 font-bold text-center">{errorMessage}</div>
);

export default function AppContainer() {
  const location = useLocation();
  // const [store, setStore] = useState<Store<unknown, UnknownAction, unknown>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <App />
    </React.StrictMode>
  );
}
