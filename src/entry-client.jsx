import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import i18n from "./i18n"; // Initialize i18n
import AppContainer from "./AppContainer";
import createAppStore from "./redux/store";

// Get preloaded state and language from server
const preloadedState = window.__PRELOADED_STATE__ || {};
const ssrLanguage = window.__SSR_LANGUAGE__;

// Set the language for client-side
i18n.changeLanguage(ssrLanguage);

// Clean up the global variables
delete window.__PRELOADED_STATE__;
delete window.__SSR_LANGUAGE__;

// Create Redux store with preloaded state
const store = createAppStore(preloadedState);

// Create a component for hydration logic
function HydratedApp() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );
}

// Hydrate the app
hydrateRoot(document.getElementById("app"), <HydratedApp />);
