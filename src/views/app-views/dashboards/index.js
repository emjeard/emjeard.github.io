import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Dashboards = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/default`}
          component={lazy(() => import(`./default`))}
        />
        <Route
          path={`${match.url}/analytic`}
          component={lazy(() => import(`./analytic`))}
        />
        <Route
          path={`${match.url}/sales`}
          component={lazy(() => import(`./sales`))}
        />
        <Route
          path={`${match.url}/rss`}
          component={lazy(() => import(`./rss`))}
        />
        <Route
          path={`${match.url}/brand`}
          component={lazy(() => import(`./brand`))}
        />{" "}
        <Route
          path={`${match.url}/image`}
          component={lazy(() => import(`./image`))}
        />
        <Route
          path={`${match.url}/service-center`}
          component={lazy(() => import(`./service-center`))}
        />
        <Route
          path={`${match.url}/custom-page`}
          component={lazy(() => import(`./custom-page`))}
        />
        <Redirect from={`${match.url}`} to={`${match.url}/default`} />
      </Switch>
    </Suspense>
  );
};

export default Dashboards;
