import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views";
import { Route, Switch } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEME_CONFIG } from "./configs/AppConfig";
import utils from "utils";
import { AUTH_TOKEN } from "redux/constants/Auth";
import history from "./history";
import { getMeProfile } from "api/ApiData";

const ENTRY_ROUTE = "/auth/login";

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme-min.css`,
};

function App() {
  let is_sessions_exp = 0;
  const setData = () =>
    new Promise((resolve) => {
      getMeProfile()
        .then((response) => {
          //console.log(response);
          is_sessions_exp = response.status;
          if (is_sessions_exp === false) {
            localStorage.removeItem(AUTH_TOKEN);
            sessionStorage.removeItem(AUTH_TOKEN);
          }
        })
        .then(() => resolve());
    });

  setData().then(() => {
    //console.log("promise done");
    if (is_sessions_exp === false) {
      const currentURL = window.location.href;
      console.log(currentURL);
      if (!currentURL.includes(ENTRY_ROUTE)) {
        history.push(ENTRY_ROUTE);
        window.location.reload();
      }
    }
  });

  return (
    <div className="App">
      <Provider store={store}>
        <ThemeSwitcherProvider
          themeMap={themes}
          defaultTheme={THEME_CONFIG.currentTheme}
          insertionPoint="styles-insertion-point"
        >
          <Router>
            <Switch>
              <Route path="/" component={Views} />
            </Switch>
          </Router>
        </ThemeSwitcherProvider>
      </Provider>
    </div>
  );
}

export default App;
