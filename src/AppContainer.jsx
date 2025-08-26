import { Helmet } from "react-helmet";
import { getTitleFromRoute } from "./utils/docTitle";
import { useLocation } from "react-router";
import App from "./app";
import React, { useEffect, useState } from "react";
import CommonLoading from "./components/loader/CommonLoading.jsx";
import axios from "axios";

const ErrorComponent = ({ errorMessage }) => (
  <div className="text-red-500 font-bold text-center">{errorMessage}</div>
);

export default function AppContainer() {
  const location = useLocation();
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
