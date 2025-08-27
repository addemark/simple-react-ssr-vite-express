import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import i18n from "./i18n";
import AppContainer from "@/AppContainer";
import createAppStore from "@/redux/store";

export const render = async (url = "*", language) => {
  // Set the language for server-side rendering
  await i18n.changeLanguage(language);

  // Create Redux store for SSR
  const store = createAppStore();

  // Render the app with Redux store
  const html = renderToString(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <StaticRouter location={url}>
          <AppContainer />
        </StaticRouter>
      </I18nextProvider>
    </Provider>
  );

  // Get the final state from the store
  const preloadedState = store.getState();

  return {
    html,
    preloadedState,
  };
};
