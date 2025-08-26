import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Initialize i18n
import AppContainer from "./AppContainer";

// Create a component for hydration logic
function HydratedApp() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </I18nextProvider>
  );
}

// Hydrate the app
hydrateRoot(document.getElementById("app"), <HydratedApp />);
