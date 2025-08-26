import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import AppContainer from "./AppContainer";

export const render = (url = "/", language = "en") => {
  // Set the language for server-side rendering
  i18n.changeLanguage(language);

  return renderToString(
    <I18nextProvider i18n={i18n}>
      <StaticRouter location={url}>
        <AppContainer />
      </StaticRouter>
    </I18nextProvider>
  );
};
