import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Dashboards = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/hp-populer/google-trend`}
          component={lazy(() => import(`./hp-populer/google-trend`))}
        />
        <Route
          path={`${match.url}/hp-populer/shopee`}
          component={lazy(() => import(`./hp-populer/shopee`))}
        />
        <Route
          path={`${match.url}/hp-terlaris/shopee`}
          component={lazy(() => import(`./hp-terlaris/shopee`))}
        />
        <Redirect from={`${match.url}`} to={`${match.url}/default`} />
      </Switch>
    </Suspense>
  );
};

export default Dashboards;
